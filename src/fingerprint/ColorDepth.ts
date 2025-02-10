import { FPValue } from ".";

/**
 * @returns client color depth
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Screen/colorDepth
 *
 */
export const getColorDepth = (): FPValue => {
  const value: FPValue = { ogValue: "Unknown", ogData: "Unknown" };

  value.ogData = value.ogValue = (window.screen.colorDepth || "Unknown").toString();
  return value;
};
