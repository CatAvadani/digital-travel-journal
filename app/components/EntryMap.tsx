'use client';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef } from 'react';

interface EntryMapProps {
  coordinates: [number, number];
}

export default function EntryMap({ coordinates }: EntryMapProps) {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

    if (mapContainerRef.current) {
      // Initialize map
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current,
        center: coordinates,
        zoom: 12,
        style: 'mapbox://styles/mapbox/streets-v11',
      });

      new mapboxgl.Marker({ color: '#D92F91' })
        .setLngLat(coordinates)
        .addTo(mapRef.current);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [coordinates]);

  return <div ref={mapContainerRef} className='w-full h-[400px] rounded-md' />;
}
