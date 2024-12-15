import { fetchImages, getCorrectCoordinates } from '@/app/api/apiImagesRequest';
import { getWeatherData } from '@/app/api/apiOpenWeatherMap';
import { fetchEntryById } from '@/app/services/entryService';
import { Link } from 'lucide-react';
import EntryDetailsClient from './EntryDetailsClient';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EntryDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const entry = await fetchEntryById(id);

  if (!entry) {
    return (
      <div className='text-center text-red-500 mt-8'>
        <h2 className='text-2xl font-bold'>Error: Entry not found</h2>
        <Link href='/dashboard' className='text-pink-400 underline mt-4 block'>
          Return to Dashboard
        </Link>
      </div>
    );
  }

  const images = entry.city ? await fetchImages(entry.city) : [];
  const weatherData = entry.coordinates
    ? await getWeatherData(...getCorrectCoordinates(entry.coordinates))
    : null;

  return (
    <EntryDetailsClient
      entry={entry}
      images={images}
      weatherData={weatherData}
    />
  );
}
