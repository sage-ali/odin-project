/**
 * Formats a given date string into a human-readable date string.
 * The formatted date string will contain the weekday, day, month, and year.
 * The date string is expected to be in the ISO 8601 format.
 * @param {string} date - A date string in the ISO 8601 format.
 * @returns {string} - A human-readable date string.
 */
export const dateFormatter = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  };
  const dateTimeFormat2 = new Intl.DateTimeFormat('en-GB', options);
  return dateTimeFormat2.format(new Date(date));
};

/**
 * Formats a given date string into a human-readable short weekday string.
 * The formatted date string will contain the abbreviated weekday (e.g. Mon, Tue, Wed).
 * The date string is expected to be in the ISO 8601 format.
 * @param {string} date - A date string in the ISO 8601 format.
 * @returns {string} - A human-readable short weekday string.
 */
export const shortDayFormatter = (date: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'short',
  };
  const dateTimeFormat2 = new Intl.DateTimeFormat('en-GB', options);
  return dateTimeFormat2.format(new Date(date));
};
