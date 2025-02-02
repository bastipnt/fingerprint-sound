/**
 * @returns client screen size/resolution
 *
 * @see https://github.com/fingerprintjs/fingerprintjs/blob/master/src/sources/screen_resolution.ts
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Screen
 *
 * Changes when multiple screens (different screen different result)
 *
 */
export const getScreenSize = (): string => {
  const resolution = `${screen.width}x${screen.height}`;
  if (resolution) return resolution;

  return "Unknown";
};
