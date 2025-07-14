import { makeAutoObservable } from "mobx";
import api from "../api/api";

const API_KEY = "cf91a6eb36893a2e62475028f94f81a3"; 

export interface WeatherData {
  city: string;
  temp: number;
  description: string;
  icon: string;
  lat: number;
  lon: number;
}

class WeatherStore {
  weather: WeatherData | null = null;
  loading = false;
  error = "";

  constructor() {
    makeAutoObservable(this);
  }

  async fetchWeather(city: string) {
    this.loading = true;
    this.error = "";
    try {
      const res = await api.get(
        `/weather?q=${city}&appid=${API_KEY}&units=metric&lang=pt_br`
      );
      const data = res.data;
      this.weather = {
        city: data.name,
        temp: data.main.temp,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        lat: data.coord.lat,
        lon: data.coord.lon,
      };
    } catch {
      this.error = "Erro ao buscar dados.";
    } finally {
      this.loading = false;
    }
  }
}

export const weatherStore = new WeatherStore();