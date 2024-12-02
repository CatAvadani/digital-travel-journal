import Image from 'next/image';

interface ImagesGridProps {
  images: string[];
}

const ImagesGrid = ({ images }: ImagesGridProps) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
      {images.map((image, index) => (
        <div
          key={index}
          className='overflow-hidden rounded-lg shadow-lg'
          style={{ breakInside: 'avoid-column' }}
        >
          <Image
            src={image}
            alt={`Image ${index + 1}`}
            className='w-full h-auto object-cover hover:scale-105 transition-transform duration-300'
            width={500}
            height={300}
          />
        </div>
      ))}
    </div>
  );
};

export default ImagesGrid;
