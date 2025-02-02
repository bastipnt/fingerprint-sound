/**
 * @returns current timezone string
 *
 * @see https://github.com/fingerprintjs/fingerprintjs/blob/master/src/sources/timezone.ts
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getTimeZones
 *
 */
export const getTimeZoneFP = (): string => {
  const DateTimeFormat = window.Intl?.DateTimeFormat;

  if (DateTimeFormat) {
    const timezone = new DateTimeFormat().resolvedOptions().timeZone;
    if (timezone) return timezone;
  }

  return "Unknown";
};
