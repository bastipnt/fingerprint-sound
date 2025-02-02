/**
 * @returns client color depth
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Screen/colorDepth
 *
 */
export const getColorDepth = (): string => {
  return (window.screen.colorDepth || "Unknown").toString();
};
