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
    <div className='grid grid-cols-4 h-screen gap-0 w-full overflow-hidden'>
      {/* Map Section */}
      <div
        ref={mapContainerRef}
        className='col-span-3 w-full h-full object-cover'
      />
      <div className='absolute top-4 left-4 bg-white p-3 rounded-md shadow-md z-50 '>
        <p>
          Longitude: {center[0].toFixed(4)} | Latitude: {center[1].toFixed(4)} |
          Zoom: {zoom.toFixed(2)}
        </p>
      </div>

      {/* Form Section */}
      <div className='glassBackground text-white px-4 py-6 flex flex-col gap-4 shadow-lg max-h-screen'>
        <h2 className='text-xl font-bold'>Add New Entry</h2>
        <form className='flex flex-col gap-4  text-white'>
          <div>
            <label htmlFor='title' className='block text-sm font-medium  '>
              Title
            </label>
            <input
              type='text'
              id='title'
              placeholder='Trip to Stockholm'
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500'
            />
          </div>
          <div>
            <label htmlFor='date' className='block text-sm font-medium'>
              Date
            </label>
            <input
              type='date'
              id='date'
              placeholder='2021-12-31'
              className='mt-1 block w-full p-2 text-gray-500 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500'
            />
          </div>
          <div className='flex flex-col gap2'>
            <label htmlFor='location' className='block text-sm font-medium'>
              Location
            </label>
            <input
              id='location'
              placeholder='Stockholm, Sweden'
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500'
            />
            <label htmlFor='location' className='block text-sm font-medium'>
              Upload Image
            </label>
            <input
              id='upload'
              placeholder='Upload Image'
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500'
            />
            <label htmlFor='location' className='block text-sm font-medium'>
              Description
            </label>
            <textarea
              id='description'
              placeholder='Write your experience here...'
              className='mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500'
              rows={4}
            />
          </div>
          <button
            type='submit'
            className='bg-gradient-to-r from-[#D92F91] to-[#800080] hover:from-[#C71585] hover:to-[#4B0082] px-16 py-3 rounded-md text-white shadow-lg transition-all duration-300 ease-in-out'
          >
            Submit
          </button>
        </form>
        <Link
          href='/'
          className='bg-gradient-to-r from-[#d92f8a] to-[#800080] hover:from-[#C71585] hover:to-[#4B0082] px-16 py-3 rounded-md text-white shadow-lg transition-all duration-300 ease-in-out text-center'
        >
          Home
        </Link>
      </div>
      <button
        className='absolute top-20 left-4 bg-pink-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-pink-600 z-10'
        onClick={handleButtonClick}
      >
        Reset
      </button>
    </div>
  );
}
