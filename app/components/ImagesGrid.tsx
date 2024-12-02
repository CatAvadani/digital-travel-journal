import { motion } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';

interface ImagesGridProps {
  images: string[];
}

const ImagesGrid: React.FC<ImagesGridProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Predefined height ranges to create masonry effect
  const heightClasses = [
    'h-64',
    'h-72',
    'h-80',
    'h-96',
    'h-[400px]',
    'h-[450px]',
    'h-[350px]',
  ];

  const getRandomHeightClass = () => {
    return heightClasses[Math.floor(Math.random() * heightClasses.length)];
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <motion.div
      className='columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 p-4'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {images.map((image, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className={`
            relative overflow-hidden rounded-lg 
            mb-4 break-inside-avoid 
            ${getRandomHeightClass()}
            cursor-pointer group
          `}
          onClick={() => handleImageClick(image)}
        >
          <Image
            src={image}
            alt={`Image ${index + 1}`}
            fill
            className='absolute inset-0 object-cover group-hover:scale-105 transition-transform duration-300'
          />
          <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
            <span className='text-white text-sm'>View Image</span>
          </div>
        </motion.div>
      ))}

      {/* Lightbox */}
      {selectedImage && (
        <motion.div
          className='fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelectedImage(null)}
        >
          <motion.div
            className='max-w-full max-h-full'
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            <Image
              src={selectedImage}
              alt='Enlarged image'
              width={1200}
              height={800}
              className='max-w-full max-h-full object-contain'
            />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ImagesGrid;
