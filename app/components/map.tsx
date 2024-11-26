'use client';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';
import AddNewEntryForm from './addNewEntryForm';

const INITIAL_ZOOM = 14;

// Utility: Debounce function
function debounce<T extends (...args: unknown[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timer: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}

export default function Map() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const [center, setCenter] = useState<[number, number] | null>(null);
  const [zoom, setZoom] = useState<number>(INITIAL_ZOOM);
  const [mapStyle, setMapStyle] = useState<string>(
    'mapbox://styles/mapbox/streets-v11'
  );

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

    // Get user's location and initialize the map
    const initializeMap = (latitude: number, longitude: number) => {
      if (mapContainerRef.current) {
        mapContainerRef.current.innerHTML = '';

        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          center: [longitude, latitude],
          zoom: zoom,
          style: mapStyle,
        });

        // Add geolocation control
        mapRef.current.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: { enableHighAccuracy: true },
            trackUserLocation: true,
          })
        );

        new mapboxgl.Marker({ color: '#D92F91' })
          .setLngLat([longitude, latitude])
          .addTo(mapRef.current);

        // Debounced state updates for `center` and `zoom`
        const updateMapState = debounce(() => {
          if (mapRef.current) {
            const mapCenter = mapRef.current.getCenter();
            const mapZoom = mapRef.current.getZoom();
            setCenter([mapCenter.lng, mapCenter.lat]);
            setZoom(mapZoom);
          }
        }, 100);

        mapRef.current.on('move', updateMapState);
      }
    };

    // Fetch user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter([longitude, latitude]);
          initializeMap(latitude, longitude);
        },
        (error) => {
          console.error('Error retrieving user location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }

    // Cleanup on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapStyle, zoom]);

  const toggleMapStyle = () => {
    if (mapRef.current) {
      const newStyle =
        mapStyle === 'mapbox://styles/mapbox/streets-v11'
          ? 'mapbox://styles/mapbox/satellite-v9'
          : 'mapbox://styles/mapbox/streets-v11';
      setMapStyle(newStyle);
      mapRef.current.setStyle(newStyle);
    }
  };

  const addMarker = (coordinates: [number, number]) => {
    if (mapRef.current) {
      new mapboxgl.Marker({ color: '#4748FD' })
        .setLngLat(coordinates)
        .addTo(mapRef.current);

      mapRef.current.flyTo({ center: coordinates, zoom: 14 });
    }
  };

  return (
    <div className='grid grid-cols-4 h-[100vh] gap-0 w-[100%] overflow-hidden'>
      {/* Map Section */}
      <div className='flex justify-center items-center col-span-3 rounded-md '>
        <div ref={mapContainerRef} className='w-[98%] h-[96%] rounded-md' />
        <div className='absolute  top-8 left-8 flex flex-col gap-3 z-50 '>
          <p className=' bg-white p-3 rounded-md shadow-md'>
            Longitude: {center ? center[0].toFixed(4) : 'N/A'} | Latitude:{' '}
            {center ? center[1].toFixed(4) : 'N/A'} | Zoom: {zoom.toFixed(2)}
          </p>
          <button
            className=' text-white px-4 py-2 rounded-md shadow-md bg-gradient-to-r from-[#D92F91] to-[#800080] hover:from-[#C71585] hover:to-[#4B0082] max-w-52'
            onClick={toggleMapStyle}
          >
            {mapStyle === 'mapbox://styles/mapbox/streets-v11'
              ? 'Standard Map'
              : 'Satellite Map'}
          </button>
        </div>
      </div>

      <AddNewEntryForm onLocationSelect={addMarker} />
    </div>
  );
}
