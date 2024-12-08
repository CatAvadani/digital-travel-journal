export const generateFacebookShareLink = (url: string): string => {
  return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    url
  )}`;
};
