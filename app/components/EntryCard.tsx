import { SquarePen, Trash2 } from 'lucide-react';
import Image from 'next/image';
import { Entry } from '../store/useEntryStore';
import { formatDate } from '../utils/formatDate';
import truncateText from '../utils/truncateText';

interface EntryCardProps {
  entry: Entry;
  onDelete: (entryId: string) => void;
  onEdit: (entry: Entry) => void;
}

export default function EntryCard({ entry, onDelete, onEdit }: EntryCardProps) {
  return (
    <article className='flex sm:flex-row border-b border-white/10 justify-between items-center mb-2'>
      {/* Left: Trip Image and description */}
      <div className='w-1/2 flex justify-start items-center gap-2 sm:gap-4 sm:mb-4'>
        <div className='flex-shrink-0 w-[50px] h-[50px] sm:w-[100px] sm:h-[100px]'>
          <Image
            src={entry.image}
            alt={entry.title}
            className='rounded-md object-cover w-full h-full'
            width={100}
            height={100}
          />
        </div>
        <div className='flex flex-col gap-1 sm:gap-2 max-w-full'>
          <h2 className='text-sm sm:text-lg font-bold text-white truncate'>
            {entry.title}
          </h2>
          <p className='text-sm text-white/80 truncate'>
            {truncateText(entry.description, 60)}
          </p>
        </div>
      </div>

      {/* Right: Trip Info and Actions */}
      <div className='w-1/2 flex justify-end lg:justify-between items-center'>
        <p className='hidden text-sm text-white/80 lg:flex justify-center items-start'>
          {formatDate(new Date(entry.date))}
        </p>
        <div className='flex justify-center items-center gap-2'>
          <button
            onClick={() => onEdit(entry)}
            className='px-4 py-2 text-[#b997ec] rounded-md bg-white/10 backdrop:blur-lg cursor-pointer hover:scale-105 transition-all'
          >
            <SquarePen className='size-4 sm:size-6' />
          </button>
          <button
            onClick={() => onDelete(entry.id)}
            className='px-4 py-2 text-[#ed859f] rounded-md bg-white/10 backdrop:blur-lg cursor-pointer hover:scale-105 transition-all'
          >
            <Trash2 className='size-4 sm:size-6' />
          </button>
        </div>
      </div>
    </article>
  );
}
