'use client';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import useEntryStore from '../store/useEntryStore';
import { handleLocationSearch } from '../utils/handleLocationSearch';
import truncateText from '../utils/truncateText';
import AddNewEntryForm from './AddNewLocationForm';
import SearchLocation from './SearchLocation';
import LoadingSpinner from './ui/LoadingSpinner';

const INITIAL_ZOOM = 14;
const DEFAULT_LOCATION = {
  latitude: 57.7035,
  longitude: 11.9669,
};

export default function Map() {
  const { user } = useAuthStore();
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<Set<string>>(new Set());
  const currentLocationMarkerRef = useRef<mapboxgl.Marker | null>(null);
  const router = useRouter();
  const { entries, fetchEntries, setSelectedCoordinates, clearEntries } =
    useEntryStore();
  const [mapInitialized, setMapInitialized] = useState(false);
  const [center, setCenter] = useState<[number, number] | null>(null);
  const [zoom, setZoom] = useState<number>(INITIAL_ZOOM);
  const [isMapLoading, setIsMapLoading] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);

  const onSearchLocation = async (searchQuery: string) => {
    await handleLocationSearch(searchQuery, mapRef);
  };

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
          style: 'mapbox://styles/mapbox/streets-v11',
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
          if (target.closest('.mapboxgl-marker')) return;

          const coordinates: [number, number] = [
            event.lngLat.lng,
            event.lngLat.lat,
          ];
          const key = `${coordinates[0].toFixed(4)},${coordinates[1].toFixed(
            4
          )}`;

          if (markersRef.current.has(key)) return;

          setSelectedCoordinates(coordinates);

          const marker = new mapboxgl.Marker({
            color: '#4748FD',
            draggable: true,
          })
            .setLngLat(coordinates)
            .addTo(mapRef.current!);

          marker.getElement().addEventListener('click', () => {
            marker.remove();
            markersRef.current.delete(key);
            setSelectedCoordinates(null);
          });

          marker.on('dragend', () => {
            const newCoordinates = marker.getLngLat();
            setSelectedCoordinates([newCoordinates.lng, newCoordinates.lat]);
            const newKey = `${newCoordinates.lng.toFixed(
              4
            )},${newCoordinates.lat.toFixed(4)}`;
            markersRef.current.delete(key);
            markersRef.current.add(newKey);
          });

          markersRef.current.add(key);
        });
        setMapInitialized(true);
      }
    };

    // Fallback to Gothenburg, Sweden if location services are disabled
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCenter([longitude, latitude]);
          setLocationError(null);
          initializeMap(latitude, longitude);
        },
        () => {
          setLocationError(
            'Showing Gothenburg, City Center. Enable location services to see your current position.'
          );
          setCenter([DEFAULT_LOCATION.longitude, DEFAULT_LOCATION.latitude]);
          initializeMap(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude);
        }
      );
    } else {
      setCenter([DEFAULT_LOCATION.longitude, DEFAULT_LOCATION.latitude]);
      initializeMap(DEFAULT_LOCATION.latitude, DEFAULT_LOCATION.longitude);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [setSelectedCoordinates]);

  const handlePopupClick = useCallback(
    (id: string) => {
      router.push(`/dashboard/myTrips/${id}`);
    },
    [router]
  );

  // Update markers when entries change
  useEffect(() => {
    if (mapInitialized && mapRef.current) {
      markersRef.current.clear();

      entries.forEach((entry) => {
        const key = `${entry.coordinates[0].toFixed(
          4
        )},${entry.coordinates[1].toFixed(4)}`;
        if (!markersRef.current.has(key)) {
          const popup = new mapboxgl.Popup({ offset: 25, closeOnClick: false });

          const popupContainer = document.createElement('div');
          popupContainer.className =
            'rounded-md cursor-pointer hover:scale-105 transition-transform duration-300 ease-in-out';
          popupContainer.style.background = 'white';
          popupContainer.style.color = 'black';
          popupContainer.innerHTML = `
            ${
              entry.image
                ? `<img src="${entry.image}" alt="Entry Image" class="my-2 rounded-md w-full h-24 object-cover" />`
                : ''
            }
            <h3 class="capitalize font-bold text-lg">${entry.title}</h3>
            <p>${truncateText(entry.description, 40)}</p>
            <p class="mt-4"><b>Date:</b> ${entry.date}</p>
          `;

          popupContainer.addEventListener('click', () => {
            handlePopupClick(entry.id);
          });

          popup.setDOMContent(popupContainer);

          new mapboxgl.Marker({ color: '#2222bb', draggable: false })
            .setLngLat(entry.coordinates)
            .setPopup(popup)
            .addTo(mapRef.current!);

          markersRef.current.add(key);
        }
      });
    }
  }, [entries, mapInitialized, handlePopupClick]);

  return (
    <main className='grid grid-cols-1 lg:grid-cols-4 sm:h-[100vh] w-[100%] mt-8 lg:mt-0'>
      <section
        aria-label='Interactive map to view and add travel entries'
        className='relative col-span-1 lg:col-span-3 flex justify-center items-center'
      >
        {locationError && (
          <div className='absolute top-2 right-3 lg:top-6 lg:right-5 z-50 bg-gradient-to-r from-[#E91E63] to-[#4B0082] text-white p-3 text-base rounded-md max-w-[300px]'>
            {locationError}
          </div>
        )}
        <div
          ref={mapContainerRef}
          className='relative w-[98%] h-[60vh] lg:h-[96%] rounded-md'
        />
        <p
          className='text-white/90 absolute -top-6 left-2 sm:hidden'
          aria-live='polite'
        >
          Click on the map to select a new entry location
        </p>
        {isMapLoading && <LoadingSpinner />}
        <div className='absolute top-2 left-3 lg:top-6 lg:left-5 flex flex-col gap-3 z-50'>
          <p className='hidden sm:block bg-white p-3 rounded-md shadow-md w-[480px]'>
            Longitude: {center ? center[0].toFixed(4) : 'N/A'} | Latitude:{' '}
            {center ? center[1].toFixed(4) : 'N/A'} | Zoom: {zoom.toFixed(2)}
          </p>
          <div className='flex gap-2 justify-start items-center'>
            <SearchLocation onSearch={onSearchLocation} />
          </div>
        </div>
      </section>

      <AddNewEntryForm />
    </main>
  );
}
