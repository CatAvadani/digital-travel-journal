import Image from 'next/image';
import { Entry } from '../store/useEntryStore';

export default function EntryCard({ entry }: { entry: Entry }) {
  return (
    <div className='flex sm:flex-row border-b border-white/10 justify-between items-center mb-2'>
      {/* Left: Trip Image and description */}
      <div className='w-1/2 flex justify-start items-center gap-4 sm:mb-4'>
        <div className='size-16 sm:size-24'>
          <Image
            src={entry.image}
            alt={entry.title}
            className='rounded-md object-cover w-full h-full'
            width={100}
            height={100}
          />
        </div>
        <div className='flex flex-col gap-1 sm:gap-2'>
          <h2 className='text-base sm:text-lg font-bold text-white'>
            {entry.title}
          </h2>
          <p className='text-sm text-white/80'>{entry.description}</p>
        </div>
      </div>

      {/* Right: Trip Info and Actions */}
      <div className='w-1/2 flex justify-end sm:justify-between items-center'>
        <p className='hidden text-sm text-white/80 sm:flex justify-center items-start'>
          {new Date(entry.date).toLocaleString()}
        </p>
        <div className='flex justify-center items-center gap-2'>
          <button className='px-4 py-2  text-[#b997ec] rounded-md bg-white/10 backdrop:blur-lg cursor-pointer hover:scale-105 transition-all'>
            Edit
          </button>
          <button className='px-4 py-2  text-[#ed859f] rounded-md  bg-white/10 backdrop:blur-lg cursor-pointer hover:scale-105 transition-all '>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
