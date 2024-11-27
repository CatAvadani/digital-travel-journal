import Image from 'next/image';
import { Entry } from '../store/useEntryStore';

export default function EntryCard({ entry }: { entry: Entry }) {
  return (
    <div className='flex flex-col md:flex-row border-b border-white/10 justify-between items-center mb-2'>
      {/* Left: Trip Image and description */}
      <div className='w-full md:w-1/2 flex justify-start items-center gap-4 mb-4'>
        <div className='w-24 h-24'>
          <Image
            src={entry.image}
            alt={entry.title}
            className='rounded-md object-cover w-full h-16 md:h-full'
            width={100}
            height={100}
          />
        </div>
        <div className='flex flex-col gap-2'>
          <h2 className='text-lg font-bold text-white'>{entry.title}</h2>
          <p className='text-sm text-white/80'>{entry.description}</p>
        </div>
      </div>

      {/* Right: Trip Info and Actions */}
      <div className='w-full md:w-1/2 flex justify-between items-center'>
        <p className='text-sm text-white/80 flex justify-center items-start'>
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
