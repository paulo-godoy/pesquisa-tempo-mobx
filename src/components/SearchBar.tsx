import { useState } from "react";
import { observer } from "mobx-react-lite";
import { weatherStore } from "../stores/WeatherStore";

export const SearchBar = observer(() => {
  const [city, setCity] = useState("");

  const handleSearch = () => {
    if (city.trim()) {
      weatherStore.fetchWeather(city);
    }
  };

  return (
    <div>
      <input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Digite uma cidade" />
      <button onClick={handleSearch}>Buscar</button>
    </div>
  );
});
