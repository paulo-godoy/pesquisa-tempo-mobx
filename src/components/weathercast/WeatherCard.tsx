import { observer } from "mobx-react-lite";
import { weatherStore } from "../../stores/WeatherStore";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import L from "leaflet";
import {
  Container,
  Content,
  WeatherInfo,
  WeatherDetails,
  MapContainerStyled,
} from "./WeatherCard.styled";

// Configurar o ícone padrão do Leaflet
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const cities = [
  "São Paulo,BR",
  "Rio de Janeiro,BR",
  "Belo Horizonte,BR",
  "Porto Alegre,BR",
  "Brasília,BR",
];

// Componente para atualizar o centro do mapa quando as coordenadas mudam
function MapUpdater({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView([lat, lon], 10);
  }, [lat, lon, map]);
  return null;
}

export const WeatherCard = observer(() => {
  const { weather, loading, error } = weatherStore;
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    setSelectedCity(city);
    weatherStore.fetchWeather(city);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!weather) return null;

  return (
    <Container>
      <h2>Previsão do Tempo</h2>
      <Content>
        <WeatherInfo>
          <div>
            <label htmlFor="city-select">Escolha a cidade: </label>
            <select id="city-select" value={selectedCity} onChange={handleCityChange}>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city.split(",")[0]}
                </option>
              ))}
            </select>
          </div>
          <WeatherDetails>
            <h3>{weather.city}</h3>
            <p>Temperatura: {weather.temp}°C</p>
            <p>Descrição: {weather.description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="Ícone do clima"
            />
          </WeatherDetails>
        </WeatherInfo>
        <MapContainerStyled>
          <MapContainer
            center={[weather.lat, weather.lon]}
            zoom={10}
            style={{ height: "100%", width: "100%" }}
          >
            <MapUpdater lat={weather.lat} lon={weather.lon} />
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={[weather.lat, weather.lon]}>
              <Popup>{weather.city}</Popup>
            </Marker>
          </MapContainer>
        </MapContainerStyled>
      </Content>
    </Container>
  );
});