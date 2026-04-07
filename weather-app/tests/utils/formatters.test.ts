import { describe, it, expect } from 'vitest';
import { dateFormatter, shortDayFormatter } from '../../src/utils/formatters';

describe('formatters utility', () => {
  describe('dateFormatter', () => {
    it('should format an ISO date string to a human-readable date in en-GB locale', () => {
      const dateString = '2026-04-07';
      const result = dateFormatter(dateString);

      // en-GB format for 'long' month and numeric day, weekday
      // Wednesday, 7 April 2026
      // Note: April 7 2026 is actually a Tuesday. Let's check with a real date.
      // 2026-04-07: 2026 is not a leap year. April 7 2026 is indeed a Tuesday.
      expect(result).toMatch(/Tuesday, 7 April 2026/);
    });

    it('should handle different years correctly', () => {
      const dateString = '2024-02-29'; // Leap day
      const result = dateFormatter(dateString);
      expect(result).toMatch(/Thursday, 29 February 2024/);
    });
  });

  describe('shortDayFormatter', () => {
    it('should format an ISO date string to an abbreviated weekday', () => {
      const dateString = '2026-04-07';
      const result = shortDayFormatter(dateString);
      expect(result).toBe('Tue');
    });

    it('should correctly format another day', () => {
      const dateString = '2026-04-08';
      const result = shortDayFormatter(dateString);
      expect(result).toBe('Wed');
    });
  });
});
