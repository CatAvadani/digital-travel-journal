'use client';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const INITIAL_CENTER: [number, number] = [11.91465, 57.72999];
const INITIAL_ZOOM = 10.6;

export default function Map() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  const [center, setCenter] = useState<[number, number]>(INITIAL_CENTER);
  const [zoom, setZoom] = useState<number>(INITIAL_ZOOM);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

    // Initialize the map
    if (mapContainerRef.current) {
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: center,
        zoom: zoom,
        style: 'mapbox://styles/mapbox/streets-v11',
      });

      // Update center and zoom on map move
      mapRef.current.on('move', () => {
        if (mapRef.current) {
          const mapCenter = mapRef.current.getCenter();
          const mapZoom = mapRef.current.getZoom();

          setCenter([mapCenter.lng, mapCenter.lat]);
          setZoom(mapZoom);
        }
      });

      // Add markers after map is initialized
      new mapboxgl.Marker({
        color: 'blue',
        // rotation: 45,
      })
        .setLngLat([11.91469, 57.71994])
        .addTo(mapRef.current);

      new mapboxgl.Marker({ color: 'red' })
        .setLngLat([11.91462, 57.72989])
        .addTo(mapRef.current);
    }

    // Cleanup on component unmount
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, []);

  const handleButtonClick = () => {
    if (mapRef.current) {
      mapRef.current.flyTo({
        center: INITIAL_CENTER,
        zoom: INITIAL_ZOOM,
      });
    }
  };

  return (
    <div className='relative w-full h-screen'>
      <div className='absolute top-4 left-4 bg-white p-3 rounded-md shadow-md z-50'>
        <p>
          Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} |
          Zoom: {zoom.toFixed(2)}
        </p>
      </div>
      <div className='absolute top-20 left-4 flex justify-center gap-2 '>
        <button
          className='left-4 bg-pink-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-pink-600 z-10'
          onClick={handleButtonClick}
        >
          Reset
        </button>
        <Link
          href='/'
          className=' bg-pink-500 text-lg text-white px-4 py-2 rounded-md shadow-md hover:bg-pink-600 z-10'
        >
          Home
        </Link>
      </div>
      <div ref={mapContainerRef} className='w-full h-full' />
    </div>
  );
}
