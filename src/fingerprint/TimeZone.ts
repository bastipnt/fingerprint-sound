import { FPValue } from ".";

/**
 * @returns current timezone string
 *
 * @see https://github.com/fingerprintjs/fingerprintjs/blob/master/src/sources/timezone.ts
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/Locale/getTimeZones
 *
 */
export const getTimeZoneFP = (): FPValue => {
  const DateTimeFormat = window.Intl?.DateTimeFormat;
  const value: FPValue = { ogValue: "Unknown", ogData: "Unknown" };

  if (DateTimeFormat) {
    const timezone = new DateTimeFormat().resolvedOptions().timeZone || "Unknown";
    value.ogData = value.ogValue = timezone;
  }

  return value;
};
