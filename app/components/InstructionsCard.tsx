import Image from 'next/image';
interface InstructionsCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
}

export default function InstructionsCard({
  id,
  title,
  description,
  image,
}: InstructionsCardProps) {
  return (
    <div
      key={id}
      className='relative group w-full sm:w-[416px] h-[300px] md:h-[350px] rounded-lg shadow-lg overflow-hidden cursor-pointer'
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        className='group-hover:scale-110 transition-transform duration-300 object-cover'
      />
      {/* Overlay */}
      <div className='absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4 text-white'>
        <h3 className='text-lg sm:text-xl font-bold mb-2'>{title}</h3>
        <p className='text-white/80 text-sm sm:text-base'>{description}</p>
      </div>
    </div>
  );
}
