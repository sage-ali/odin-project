import { WeatherQueryParams, OpenMeteoResponse } from '@/types/weather.types';

export const CURRENT_WEATHER_VARS = [
  'temperature_2m',
  'relative_humidity_2m',
  'is_day',
  'wind_speed_10m',
  'weather_code',
  'apparent_temperature',
  'precipitation',
  'cloud_cover',
] as const;

export const DAILY_WEATHER_VARS = [
  'weather_code',
  'temperature_2m_max',
  'temperature_2m_min',
  'sunrise',
  'sunset',
  'uv_index_max',
  'uv_index_clear_sky_max',
] as const;

export class WeatherService {
  private static buildWeatherUrl(params: WeatherQueryParams): string {
    const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

    // 1. Destructure the params for clean access
    const { latitude, longitude, current, daily, timezone } = params;

    // 2. Use URLSearchParams to handle the encoding and array joins
    const queryString = new URLSearchParams({
      latitude: latitude.toString(),
      longitude: longitude.toString(),
      current: current.join(','),
      daily: daily.join(','),
      timezone, // URLSearchParams will handle the Europe/London -> Europe%2FLondon conversion
    }).toString();

    return `${BASE_URL}?${queryString}`;
  }

  public static async fetchWeatherData(
    lat: number,
    lon: number,
    tz: string = 'Europe/London'
  ): Promise<OpenMeteoResponse | undefined> {
    try {
      const params: WeatherQueryParams = {
        latitude: lat,
        longitude: lon,
        timezone: tz,
        current: CURRENT_WEATHER_VARS, // Spread into array
        daily: DAILY_WEATHER_VARS,
      };
      const url = WeatherService.buildWeatherUrl(params);
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
      return undefined;
    }
  }
}
