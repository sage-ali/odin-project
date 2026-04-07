import { describe, it, expect } from 'vitest';
import { convertTemp } from '../../src/utils/converters';

describe('converters utility', () => {
  describe('convertTemp', () => {
    it('should convert 0°C to 32°F', () => {
      const result = convertTemp({ temp: 0, unit: 'C' });
      expect(result).toEqual({ temp: 32, unit: 'F' });
    });

    it('should convert 100°C to 212°F', () => {
      const result = convertTemp({ temp: 100, unit: 'C' });
      expect(result).toEqual({ temp: 212, unit: 'F' });
    });

    it('should convert 32°F to 0°C', () => {
      const result = convertTemp({ temp: 32, unit: 'F' });
      expect(result).toEqual({ temp: 0, unit: 'C' });
    });

    it('should convert 212°F to 100°C', () => {
      const result = convertTemp({ temp: 212, unit: 'F' });
      expect(result).toEqual({ temp: 100, unit: 'C' });
    });

    it('should handle negative temperatures correctly', () => {
      const result = convertTemp({ temp: -40, unit: 'C' });
      expect(result).toEqual({ temp: -40, unit: 'F' });
    });

    it('should handle decimal temperatures correctly', () => {
      const result = convertTemp({ temp: 18.5, unit: 'C' });
      expect(result.temp).toBeCloseTo(65.3, 1);
      expect(result.unit).toBe('F');
    });
  });
});
