/**
 * API Request object to Open-Meteo
 * for geolocation data
 */
export interface GeoLocationQueryParams {
  place: string;
  count: number;
  language: string;
}

/**
 * API Request object to Open-Meteo
 * for weather data
 */
export interface WeatherQueryParams {
  latitude: number;
  longitude: number;
  timezone: string;
  usesTimezone: boolean;
  current: string[]; // List of current weather variables
  daily: string[]; // List of daily forecast variables
}

/**
 * Raw API Response from Open-Meteo
 * Matches the JSON structure exactly for zero-error mapping.
 */
export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;

  current_units: {
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    is_day: string;
    wind_speed_10m: string;
    weather_code: string;
    apparent_temperature: string;
    precipitation: string;
    cloud_cover: string;
  };

  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    is_day: number; // 0 for night, 1 for day
    wind_speed_10m: number;
    weather_code: number;
    apparent_temperature: number;
    precipitation: number;
    cloud_cover: number;
  };

  daily_units: {
    time: string;
    weather_code: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    sunrise: string;
    sunset: string;
    uv_index_max: string;
    uv_index_clear_sky_max: string;
  };

  daily: {
    time: string[];
    weather_code: number[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
    uv_index_clear_sky_max: number[];
  };
}

/**
 * The Data Contract for the application.
 * This is the "Clean" object returned by models/weatherFactory.ts
 */
export interface ProcessedWeather {
  // Hero Section
  location: string;
  temp: number;
  apparentTemp: number; // "Feels like"
  condition: string; // e.g., "Partly Cloudy"
  icon: string; // e.g., "wb_sunny" (Material Icon name)
  isDay: boolean; // To toggle UI themes

  // Details Grid
  humidity: number;
  windSpeed: number;
  precipitation: number;
  cloudCover: number;
  uvIndex: number;
  sunCycle: {
    sunrise: string; // Formatted time: "6:42 AM"
    sunset: string; // Formatted time: "7:51 PM"
  };

  // Forecast Strip
  dailyForecast: DailyForecastDay[];
}

/**
 * Helper interface for the 7-day strip
 */
export interface DailyForecastDay {
  date: string; // e.g., "Tue"
  maxTemp: number;
  minTemp: number;
  condition: string; // Mapping code to text
  icon: string; // Mapping code to Material Icon
}
