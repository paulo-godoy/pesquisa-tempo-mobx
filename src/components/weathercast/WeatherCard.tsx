import { observer } from "mobx-react-lite";
import { weatherStore, type ForecastData } from "../../stores/WeatherStore";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import L from "leaflet";
import { FaMapMarkerAlt, FaThermometerHalf, FaCloudRain, FaWind, FaTint } from "react-icons/fa";
import ReactDOMServer from "react-dom/server";
import {
  Container,
  Header,
  Content,
  WeatherInfo,
  ForecastSection,
  ForecastItem,
  WeatherDetails,
  DetailCard,
  MapContainerStyled,
  CitySelector,
  StyledSelect,
  WeatherItem,
} from "./WeatherCard.styled";

// Configurar o ícone padrão do Leaflet
const createCustomIcon = () => {
  const iconHtml = ReactDOMServer.renderToString(<FaMapMarkerAlt size={40} color="#e74c3c" />);
  return L.divIcon({
    html: iconHtml,
    className: "",
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
  });
};

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

// Interface para os períodos
interface ForecastPeriods {
  Madrugada: ForecastData[];
  Manhã: ForecastData[];
  Tarde: ForecastData[];
  Noite: ForecastData[];
}

// Função para agrupar previsão por períodos do dia
const getForecastByPeriod = (forecast: ForecastData[]) => {
  const periods: ForecastPeriods = {
    Madrugada: [],
    Manhã: [],
    Tarde: [],
    Noite: [],
  };

  forecast.forEach((item) => {
    const hour = new Date(item.dt_txt).getUTCHours();
    if (hour >= 0 && hour < 6) periods.Madrugada.push(item);
    else if (hour >= 6 && hour < 12) periods.Manhã.push(item);
    else if (hour >= 12 && hour < 18) periods.Tarde.push(item);
    else periods.Noite.push(item);
  });

  return periods;
};

export const WeatherCard = observer(() => {
  const { weather, forecast, loading, error } = weatherStore;
  const [selectedCity, setSelectedCity] = useState(cities[0]);

  const handleCityChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const city = event.target.value;
    setSelectedCity(city);
    weatherStore.fetchWeather(city);
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;
  if (!weather || !forecast) return null;

  const periods = getForecastByPeriod(forecast);
  const currentPeriod = Object.values(periods)[0][0]; // Primeira previsão do dia

  return (
    <Container>
      <Header>
        <h2>Previsão do Tempo</h2>
        <p>{new Date().toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long" })}</p>
      </Header>
      <Content>
        <WeatherInfo>
          <CitySelector>
            <FaMapMarkerAlt />
            <label htmlFor="city-select">Escolha a cidade: </label>
            <StyledSelect id="city-select" value={selectedCity} onChange={handleCityChange}>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city.split(",")[0]}
                </option>
              ))}
            </StyledSelect>
          </CitySelector>
          <WeatherItem>
            <FaCloudRain /> {currentPeriod.weather[0].description} ({(currentPeriod.pop * 100).toFixed(0)}%)
          </WeatherItem>
          <WeatherItem>
            <FaThermometerHalf /> Temp: {currentPeriod.main.temp_min.toFixed(1)}°C - {currentPeriod.main.temp_max.toFixed(1)}°C
          </WeatherItem>
          <ForecastSection>
            {Object.entries(periods).map(([period, items]) => (
              <ForecastItem key={period}>
                <img
                  src={`https://openweathermap.org/img/wn/${items[0].weather[0].icon}@2x.png`}
                  alt={period}
                />
                <p>{period}</p>
              </ForecastItem>
            ))}
          </ForecastSection>
          <WeatherDetails>
            <DetailCard>
              <FaThermometerHalf />
              <WeatherItem>Temperatura</WeatherItem>
              <WeatherItem>{weather.temp.toFixed(1)}°C</WeatherItem>
            </DetailCard>
            <DetailCard>
              <FaCloudRain />
              <WeatherItem>Chuva</WeatherItem>
              <WeatherItem>{currentPeriod.pop * 100}%</WeatherItem>
            </DetailCard>
            <DetailCard>
              <FaWind />
              <WeatherItem>Vento</WeatherItem>
              <WeatherItem>5 km/h</WeatherItem> {/* Placeholder - Fetch wind data */}
            </DetailCard>
            <DetailCard>
              <FaTint />
              <WeatherItem>Umidade</WeatherItem>
              <WeatherItem>{weather.temp > 20 ? "80%" : "90%"}%</WeatherItem> {/* Placeholder - Fetch humidity */}
            </DetailCard>
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
            <Marker position={[weather.lat, weather.lon]} icon={createCustomIcon()}>
              <Popup>{weather.city}</Popup>
            </Marker>
          </MapContainer>
        </MapContainerStyled>
      </Content>
    </Container>
  );
});