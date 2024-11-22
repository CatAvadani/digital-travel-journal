interface GlassCardProps {
  title: string;
  description: string;
  icon: React.ElementType;
}

export default function GlassCard({
  title,
  description,
  icon: Icon,
}: GlassCardProps) {
  return (
    <div
      className='
      bg-white bg-opacity-10 
      backdrop-blur-lg backdrop-filter
      rounded-lg gap-2
      p-8 h-52 w-[400px] flex flex-col items-start justify-center
    '
    >
      <div
        className='
          bg-white/5 
          backdrop-blur-md 
          backdrop-filter 
          rounded-full 
          p-4 
          flex items-center justify-center 
          text-pink-500
          mb-4
        '
      >
        {' '}
        <Icon className=' size-6' />
      </div>
      <div className=' text-white/80 flex flex-col gap-2'>
        <h2 className='text-xl font-medium'>{title}</h2>
        <p className='text-sm'>{description}</p>
      </div>
    </div>
  );
}
