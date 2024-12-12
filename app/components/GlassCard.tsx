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
      bg-black/40
      backdrop-blur-lg backdrop-filter
      rounded-md gap-4
      px-4 h-64 md:h-72 lg:w-[416px] md:w-[330px]
      flex flex-col items-center justify-center border border-white/5 hover:border-white/10
      transition-all duration-300
    '
    >
      <div
        className='
          bg-white/10 
          backdrop-blur-md 
          backdrop-filter 
          rounded-full 
          p-6 
          flex items-center justify-center 
          text-pink-500
          mb-4
        '
      >
        <Icon className='size-8' />
      </div>
      <div className='text-white/80 flex flex-col gap-2 text-center'>
        <h2 className='text-lg md:text-xl font-medium'>{title}</h2>
        <p className='text-sm md:text-base'>{description}</p>
      </div>
    </div>
  );
}
