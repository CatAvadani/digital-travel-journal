'use client';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useAuthStore } from '../store/useAuthStore';
import useEntryStore from '../store/useEntryStore';
import truncateText from '../utils/truncateText';
import AddNewEntryForm from './AddNewEntryForm';
import LoadingSpinner from './ui/LoadingSpinner';

const INITIAL_ZOOM = 14;

export default function Map() {
  const { user } = useAuthStore();
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<Set<string>>(new Set());
  const currentLocationMarkerRef = useRef<mapboxgl.Marker | null>(null);

  const { entries, fetchEntries, setSelectedCoordinates, clearEntries } =
    useEntryStore();
  const [mapInitialized, setMapInitialized] = useState(false);
  const [center, setCenter] = useState<[number, number] | null>(null);
  const [zoom, setZoom] = useState<number>(INITIAL_ZOOM);
  const [mapStyle, setMapStyle] = useState<string>(
    'mapbox://styles/mapbox/streets-v11'
  );
  const [isMapLoading, setIsMapLoading] = useState(true);

  useEffect(() => {
    if (user) {
      clearEntries();
      fetchEntries(user.uid);
    }
  }, [user, fetchEntries, clearEntries]);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || '';

    const initializeMap = (latitude: number, longitude: number) => {
      if (mapContainerRef.current) {
        mapContainerRef.current.innerHTML = '';

        mapRef.current = new mapboxgl.Map({
          container: mapContainerRef.current,
          center: [longitude, latitude],
          zoom: INITIAL_ZOOM,
          style: mapStyle,
        });

        mapRef.current.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: { enableHighAccuracy: true },
            trackUserLocation: true,
          })
        );

        // Add a marker for the user's current location
        currentLocationMarkerRef.current = new mapboxgl.Marker({
          color: '#D92F91',
        })
          .setLngLat([longitude, latitude])
          .addTo(mapRef.current!);

        const updateMapState = () => {
          if (mapRef.current) {
            const mapCenter = mapRef.current.getCenter();
            const mapZoom = mapRef.current.getZoom();
            setCenter([mapCenter.lng, mapCenter.lat]);
            setZoom(mapZoom);
          }
        };

        mapRef.current.on('move', updateMapState);

        mapRef.current.on('load', () => {
          setIsMapLoading(false);
        });

        // Handle map clicks to place draggable markers
        mapRef.current.on('click', (event) => {
          const target = event.originalEvent.target as HTMLElement;

          // Check if clicking on an existing marker
          if (target.closest('.mapboxgl-marker')) return;

          const coordinates: [number, number] = [
            event.lngLat.lng,
            event.lngLat.lat,
          ];
          const key = `${coordinates[0].toFixed(4)},${coordinates[1].toFixed(
            4
          )}`;

          // Check if marker already exists at these coordinates
          if (markersRef.current.has(key)) return;

          setSelectedCoordinates(coordinates);

          // Create a draggable marker
          const marker = new mapboxgl.Marker({
            color: '#4748FD',
            draggable: true,
          })
            .setLngLat(coordinates)
            .addTo(mapRef.current!);

          // Add click event listener to remove the marker
          marker.getElement().addEventListener('click', () => {
            marker.remove();
            markersRef.current.delete(key);
            setSelectedCoordinates(null);
          });

          // Update marker coordinates when dragged
          marker.on('dragend', () => {
            const newCoordinates = marker.getLngLat();
            setSelectedCoordinates([newCoordinates.lng, newCoordinates.lat]);

            // Update the marker's key in the Set
            const newKey = `${newCoordinates.lng.toFixed(
              4
            )},${newCoordinates.lat.toFixed(4)}`;
            markersRef.current.delete(key);
            markersRef.current.add(newKey);
          });

          // Store the marker's coordinates in the Set
          markersRef.current.add(key);
        });
        setMapInitialized(true);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter([longitude, latitude]);
          initializeMap(latitude, longitude);
        },
        (error) => {
          console.error('Error retrieving user location:', error);
          toast.error('Error retrieving user location');
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapStyle, setSelectedCoordinates]);

  // Update markers when `entries` change
  useEffect(() => {
    if (mapInitialized && mapRef.current) {
      // Clear previous markers
      markersRef.current.clear();

      // Add markers for entries
      entries.forEach((entry) => {
        const key = `${entry.coordinates[0].toFixed(
          4
        )},${entry.coordinates[1].toFixed(4)}`;

        if (!markersRef.current.has(key)) {
          new mapboxgl.Marker({ color: '#2222bb', draggable: false })
            .setLngLat(entry.coordinates)
            .setPopup(
              new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <div class="rounded-md">
                  ${
                    entry.image
                      ? `<img src="${entry.image}" alt="Entry Image" class="my-2 rounded-md w-full h-24 object-cover" />`
                      : ''
                  }
                  <h3 class="capitalize font-bold">${entry.title}</h3>
                  <p>${truncateText(entry.description, 40)}</p>
                  <p><b>Date:</b> ${entry.date}</p>
                </div>
              `)
            )
            .addTo(mapRef.current!);

          markersRef.current.add(key);
        }
      });
    }
  }, [entries, mapInitialized]);

  const toggleMapStyle = () => {
    if (mapRef.current) {
      const newStyle =
        mapStyle === 'mapbox://styles/mapbox/streets-v11'
          ? 'mapbox://styles/mapbox/satellite-v9'
          : 'mapbox://styles/mapbox/streets-v11';
      setMapStyle(newStyle);
      mapRef.current.setStyle(newStyle);
      toast.success(
        `Switched to ${
          newStyle.includes('satellite') ? 'Satellite' : 'Standard'
        } Map`
      );
    }
  };

  return (
    <main className='grid grid-cols-1 sm:grid-cols-4 sm:h-[100vh] w-[100%] mt-8 sm:mt-0'>
      {/* Map Section */}
      <section
        aria-label='Interactive map to view and add travel entries'
        className='relative col-span-1 sm:col-span-3 flex justify-center items-center'
      >
        {' '}
        <div
          ref={mapContainerRef}
          className='relative w-[98%] h-[60vh] md:h-[96%] rounded-md'
        />
        <p
          className='text-white/90 absolute -top-6 left-2 sm:hidden'
          aria-live='polite'
        >
          Click on the map to select a new entry location
        </p>
        {isMapLoading && <LoadingSpinner />}
        <div className='absolute top-8 left-8 hidden sm:flex flex-col gap-3 z-50'>
          <p className='bg-white p-3 rounded-md shadow-md'>
            Longitude: {center ? center[0].toFixed(4) : 'N/A'} | Latitude:{' '}
            {center ? center[1].toFixed(4) : 'N/A'} | Zoom: {zoom.toFixed(2)}
          </p>
          <button
            className=' text-white h-12 rounded-md shadow-md bg-gradient-to-r from-[#E91E63] to-[#4B0082] hover:from-[#eb3473] hover:to-[#800080] max-w-52'
            onClick={toggleMapStyle}
          >
            {mapStyle === 'mapbox://styles/mapbox/streets-v11'
              ? 'Standard Map'
              : 'Satellite Map'}
          </button>
        </div>
      </section>

      {/* Form Section */}
      <section aria-labelledby='add-entry-form'>
        <AddNewEntryForm />
      </section>
    </main>
  );
}
