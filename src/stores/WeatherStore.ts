import { makeAutoObservable } from "mobx";
import api from "../api/api";

const API_KEY = "cf91a6eb36893a2e62475028f94f81a3"; // Substitua pela sua chave

export interface WeatherData {
  city: string;
  temp: number;
  description: string;
  icon: string;
  lat: number;
  lon: number;
}

export interface ForecastData {
  dt_txt: string;
  main: {
    temp: number;
    temp_min: number;
    temp_max: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
  pop: number; // Probability of precipitation
}

class WeatherStore {
  weather: WeatherData | null = null;
  forecast: ForecastData[] | null = null;
  loading = false;
  error = "";

  constructor() {
    makeAutoObservable(this);
  }

  async fetchWeather(city: string) {
    this.loading = true;
    this.error = "";
    try {
      // Fetch current weather
      const currentRes = await api.get(
        `/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
      );
      const currentData = currentRes.data;
      this.weather = {
        city: currentData.name,
        temp: currentData.main.temp,
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        lat: currentData.coord.lat,
        lon: currentData.coord.lon,
      };

      // Fetch forecast
      const forecastRes = await api.get(
        `/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
      );
      this.forecast = forecastRes.data.list;
    } catch  {
      this.error = "Erro ao buscar dados.";
    } finally {
      this.loading = false;
    }
  }
}

export const weatherStore = new WeatherStore();