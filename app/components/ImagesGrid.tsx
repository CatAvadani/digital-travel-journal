'use client';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import React, { useState } from 'react';
import { useInView } from 'react-intersection-observer';

interface ImagesGridProps {
  images: string[];
}

const ImagesGrid: React.FC<ImagesGridProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Predefined height ranges to create masonry effect
  const heightClasses = [
    'h-40 sm:h-64',
    'h-44 sm:h-72',
    'h-48 sm:h-80',
    'h-52 sm:h-96',
    'h-56 sm:h-[400px]',
    'h-60 sm:h-[420px]',
    'h-64 sm:h-[450px]',
  ];

  const getRandomHeightClass = () => {
    return heightClasses[Math.floor(Math.random() * heightClasses.length)];
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
      },
    },
  };

  const handleImageClick = (image: string) => {
    setSelectedImage(image);
  };

  return (
    <motion.div
      className='columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4'
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {images.map((image, index) => (
        <ScrollRevealWrapper key={index} variants={itemVariants}>
          <div
            className={`
              relative overflow-hidden rounded-md 
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
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
              className='absolute inset-0 object-cover group-hover:scale-105 transition-transform duration-300'
            />

            <div className='absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center'>
              <span className='text-white text-sm font-bold'>View Image</span>
            </div>
          </div>
        </ScrollRevealWrapper>
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
              width={800}
              height={600}
              className='max-w-full max-h-full object-contain'
            />
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
};

// Custom wrapper component for scroll reveal
const ScrollRevealWrapper: React.FC<{
  children: React.ReactNode;
  variants: Variants;
}> = ({ children, variants }) => {
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
    >
      {children}
    </motion.div>
  );
};

export default ImagesGrid;
