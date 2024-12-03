export const fetchImages = async (location: string): Promise<string[]> => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(
        location
      )}&client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`
    );
    const data = await response.json();
    return data.results.map((img: any) => img.urls.small);
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
};
