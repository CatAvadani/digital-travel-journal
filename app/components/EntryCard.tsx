import { SquarePen, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Entry } from '../interfaces/entry';
import { formatDate } from '../utils/formatDate';
import truncateText from '../utils/truncateText';

interface EntryCardProps {
  entry: Entry;
  onDelete: (entryId: string) => void;
  onEdit: (entry: Entry) => void;
}

export default function EntryCard({ entry, onDelete, onEdit }: EntryCardProps) {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/dashboard/myTrips/${entry.id}`);
  };

  const handleButtonClick = (event: React.MouseEvent) => {
    event.stopPropagation();
  };

  return (
    <div
      onClick={handleCardClick}
      className='flex flex-row border-b border-white/10 justify-between items-center mb-2 hover:bg-[#4B0082]/10 transition-all duration-300 ease-in-out rounded-md p-2 cursor-pointer'
    >
      {/* Left: Trip Image and Description */}
      <div className='w-3/4 sm:w-1/2 flex justify-start items-center gap-2 sm:gap-4'>
        <div className='flex-shrink-0 w-[60px] h-[60px] sm:w-[100px] sm:h-[100px]'>
          <Image
            src={entry.image}
            alt=''
            className='rounded-md object-cover w-full h-full'
            width={100}
            height={100}
          />
        </div>
        <div className='flex flex-col gap-1 sm:gap-2 max-w-full items-start overflow-hidden'>
          <h2 className='text-sm sm:text-lg font-bold text-white truncate w-full'>
            {truncateText(entry.title, 15)}
          </h2>
          <p className='text-xs sm:text-sm text-white/80 truncate w-full'>
            {entry.city}, {entry.country}
          </p>
        </div>
      </div>

      {/* Right: Trip Info and Actions */}
      <div className='w-1/4 sm:w-1/2 flex justify-end lg:justify-between items-center pl-2'>
        <p className='hidden text-sm text-white/80 lg:flex justify-center items-start'>
          {formatDate(new Date(entry.date))}
        </p>
        <div className='flex justify-end items-center gap-1 sm:gap-2'>
          <button
            onClick={(e) => {
              handleButtonClick(e);
              onEdit(entry);
            }}
            aria-label='Edit Trip'
            className='p-1.5 sm:px-4 sm:py-2 text-[#d8b0f5] rounded-md bg-[#2C1735] backdrop:blur-lg cursor-pointer hover:scale-105 transition-all'
          >
            <SquarePen className='size-3.5 sm:size-6' />
          </button>
          <button
            onClick={(e) => {
              handleButtonClick(e);
              onDelete(entry.id);
            }}
            aria-label='Delete Trip'
            className='p-1.5 sm:px-4 sm:py-2 text-[#ed859f] rounded-md bg-[#2C1735] backdrop:blur-lg cursor-pointer hover:scale-105 transition-all'
          >
            <Trash2 className='size-3.5 sm:size-6' />
          </button>
        </div>
      </div>
    </div>
  );
}
