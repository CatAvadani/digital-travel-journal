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
      bg-black/20
      backdrop-blur-lg backdrop-filter
      rounded-lg gap-4
      px-8 h-64 sm:w-[450px] flex flex-col items-center justify-center border border-white/10
    '
    >
      <div
        className='
          bg-white/5 
          backdrop-blur-md 
          backdrop-filter 
          rounded-full 
          p-6 
          flex items-center justify-center 
          text-pink-500
          mb-4
        '
      >
        {' '}
        <Icon className=' size-8' />
      </div>
      <div className=' text-white/80 flex flex-col gap-2 text-center'>
        <h2 className='text-xl font-medium'>{title}</h2>
        <p className='text-sm'>{description}</p>
      </div>
    </div>
  );
}
