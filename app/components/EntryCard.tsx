import Image from 'next/image';
import { Entry } from '../store/useEntryStore';

export default function EntryCard({ entry }: { entry: Entry }) {
  return (
    <div className='mb-6 border-b border-white/10 p-4 flex justify-between items-center '>
      <div className='flex justify-center items-center gap-4'>
        <div className='w-16 h-16'>
          <Image
            src={entry.image}
            alt={entry.title}
            className='rounded-md w-full  h-full object-cover'
            width={100}
            height={100}
          />
        </div>
        <div>
          <h2 className='text-base text-white font-semibold'>{entry.title}</h2>
          <p className='text-white text-sm'>{entry.description}</p>
        </div>
      </div>
      <div className='flex justify-center items-center gap-2'>
        <button className=' px-4 py-1 rounded-md text-white border border-white'>
          Edit
        </button>
        <button className=' px-4 py-1 rounded-md text-white border border-red-400'>
          Delete
        </button>
      </div>
    </div>
  );
}
