import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WeatherService } from '@/services/weatherApi';

describe('weatherApi Service', () => {
  const mockLat = 51.5074;
  const mockLon = -0.1278;
  const mockTz = 'Europe/London';

  const mockSuccessResponse = {
    latitude: 51.5,
    longitude: -0.12,
    current: {
      temperature_2m: 15,
      weather_code: 0,
    },
    daily: {
      time: ['2026-04-07'],
      weather_code: [0],
      temperature_2m_max: [18],
      temperature_2m_min: [10],
    },
  };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('should successfully fetch weather data', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockSuccessResponse),
      })
    );

    const result = await WeatherService.fetchWeatherData(mockLat, mockLon, mockTz);

    expect(result).toEqual(mockSuccessResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('should construct the correct URL with all parameters', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve(mockSuccessResponse),
      })
    );

    await WeatherService.fetchWeatherData(mockLat, mockLon, mockTz);

    const calledUrl = vi.mocked(fetch).mock.calls[0][0] as string;

    expect(calledUrl).toContain('latitude=51.5074');
    expect(calledUrl).toContain('longitude=-0.1278');
    // Verify that our default vars are included in the URL
    expect(calledUrl).toContain('current=temperature_2m');
    expect(calledUrl).toContain('timezone=Europe%2FLondon');
    expect(calledUrl).toContain('https://api.open-meteo.com/v1/forecast');
  });

  it('should return undefined and log error when response is not ok', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 404,
      })
    );

    const consoleSpy = vi.spyOn(console, 'log').mockImplementation(() => {});

    const result = await WeatherService.fetchWeatherData(mockLat, mockLon, mockTz);

    expect(result).toBeUndefined();
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringContaining('HTTP error! Status: 404'));
  });

  it('should return undefined when a network error occurs', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network failure')));

    const result = await WeatherService.fetchWeatherData(mockLat, mockLon, mockTz);

    expect(result).toBeUndefined();
  });
});
