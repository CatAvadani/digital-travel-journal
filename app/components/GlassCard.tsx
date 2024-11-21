interface GlassCardProps {
  title: string;
  description: string;
}

export default function GlassCard({ title, description }: GlassCardProps) {
  return (
    <div
      className='
      bg-white dark:bg-black bg-opacity-10 dark:bg-opacity-10
      backdrop-blur-lg backdrop-filter
      rounded-lg shadow-lg
      p-4 h-52 w-[400px] flex items-center justify-center
    '
    >
      <div className='text-center text-white'>
        <h2 className='text-xl font-semibold mb-2'>{title}</h2>
        <p className='text-sm'>{description}</p>
      </div>
    </div>
  );
}
