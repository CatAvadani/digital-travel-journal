'use client';

import { collection, getDocs } from 'firebase/firestore';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';
import { db } from '../firebase/firebase';
import useEntryStore, { Entry } from '../store/useEntryStore';
import AddNewEntryForm from './AddNewEntryForm';

const INITIAL_ZOOM = 14;

export default function Map() {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const markersRef = useRef<Set<string>>(new Set());
  const currentLocationMarkerRef = useRef<mapboxgl.Marker | null>(null);

  const { entries, setEntries, setSelectedCoordinates } = useEntryStore();
  const [center, setCenter] = useState<[number, number] | null>(null);
  const [zoom, setZoom] = useState<number>(INITIAL_ZOOM);
  const [mapStyle, setMapStyle] = useState<string>(
    'mapbox://styles/mapbox/streets-v11'
  );

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
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [mapStyle, setSelectedCoordinates]);

  // Fetch entries from Firestore when the map component loads
  useEffect(() => {
    const fetchEntries = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'entries'));
        const fetchedEntries = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Entry[];
        setEntries(fetchedEntries); // Update the entries in the store
      } catch (error) {
        console.error('Error fetching entries from Firestore:', error);
      }
    };

    fetchEntries();
  }, [setEntries]);

  // Update markers when `entries` change
  useEffect(() => {
    if (mapRef.current) {
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
                  <h3 class="capitalize font-bold">${entry.title}</h3>
                  <p>${entry.description}</p>
                  <p><b>Date:</b> ${entry.date}</p>
                  ${
                    entry.image
                      ? `<img src="${entry.image}" alt="Entry Image" class="mt-4 rounded-md w-full h-auto object-cover" />`
                      : ''
                  }
                </div>
              `)
            )
            .addTo(mapRef.current!);

          markersRef.current.add(key);
        }
      });
    }
  }, [entries]);

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

  return (
    <div className='grid grid-cols-4 h-[100vh] gap-0 w-[100%] overflow-hidden'>
      <div className='flex justify-center items-center col-span-3 rounded-md'>
        <div ref={mapContainerRef} className='w-[98%] h-[96%] rounded-md' />
        <div className='absolute top-8 left-8 flex flex-col gap-3 z-50'>
          <p className='bg-white p-3 rounded-md shadow-md'>
            Longitude: {center ? center[0].toFixed(4) : 'N/A'} | Latitude:{' '}
            {center ? center[1].toFixed(4) : 'N/A'} | Zoom: {zoom.toFixed(2)}
          </p>
          <button
            className='text-white px-4 py-2 rounded-md shadow-md bg-gradient-to-r from-[#E91E63] to-[#4B0082] hover:from-[#eb3473] hover:to-[#800080] max-w-52'
            onClick={toggleMapStyle}
          >
            {mapStyle === 'mapbox://styles/mapbox/streets-v11'
              ? 'Standard Map'
              : 'Satellite Map'}
          </button>
        </div>
      </div>
      <AddNewEntryForm />
    </div>
  );
}
