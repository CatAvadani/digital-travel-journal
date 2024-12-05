import mapboxgl from 'mapbox-gl';
import toast from 'react-hot-toast';
import { searchLocation } from '../api/apiMapboxSearchLocation';

export const handleLocationSearch = async (
  searchQuery: string,
  mapRef: React.MutableRefObject<mapboxgl.Map | null>
) => {
  if (!mapRef.current) return;

  try {
    const data = await searchLocation(searchQuery);
    const location = data.features[0];

    if (location) {
      const [longitude, latitude] = location.center;

      mapRef.current.flyTo({
        center: [longitude, latitude],
        zoom: 10,
        essential: true,
      });

      new mapboxgl.Marker({ color: '#FF0000' })
        .setLngLat([longitude, latitude])
        .addTo(mapRef.current);

      toast.success(`Navigated to ${location.place_name}`);
    } else {
      toast.error('Location not found');
    }
  } catch (error) {
    toast.error('Error searching for location');
    console.error(error);
  }
};
