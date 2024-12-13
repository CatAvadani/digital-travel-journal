'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { Pause, Play } from 'react-feather';
import Footer from './components/Footer';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  const toggleVideoPlayback = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }

      setIsVideoPlaying((prev) => !prev);
    }
  };

  return (
    <div className='relative w-full h-screen overflow-hidden'>
      <div className='absolute hidden sm:block z-50 top-1/2 -ml-[7%] transform -translate-y-1/2 -rotate-90 text-white/90 text-lg md:text-2xl lg:text-3xl font-semibold tracking-widest drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]'>
        Digital Travel Journal
      </div>

      <video
        ref={videoRef}
        className='absolute top-0 left-0 w-full h-full object-cover'
        autoPlay
        muted
        loop
        preload='auto'
        playsInline
        aria-label='Globe Video Background'
      >
        <source src='/globe-video-1.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      <div
        className='absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-black/20 to-transparent backdrop-blur-lg z-10'
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        }}
      ></div>

      <Footer positionClass='bottom-10 sm:left-24 md:left-32' />

      <div className='z-20 text-white/95 text-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[70%]'>
        <h1 className='text-3xl md:text-5xl lg:text-7xl mb-14 sm:mb-20 w-full sm:max-w-4xl mx-auto font:normal sm:font-medium leading-[2.5rem] md:leading-[4rem] lg:leading-[6rem] drop-shadow-[0_2px_3px_rgba(0,0,0,0.3)]'>
          Turn Your Journeys into Timeless Stories
        </h1>
        <Link
          href='/mapView'
          className='bg-gradient-to-r from-[#E91E63] to-[#4B0082] hover:from-[#E91E63]/80 hover:to-[#4B0082]/80 px-4 sm:px-16 py-3 rounded-full text-white shadow-lg transition-all duration-300 ease-in-out text-base lg:text-lg inline-block drop-shadow-md'
        >
          Begin Your Journey
        </Link>
      </div>

      <button
        onClick={toggleVideoPlayback}
        className='absolute bottom-8 right-4 sm:right-10 hover:scale-110 transition-all text-white/90 text-sm md:text-base p-4 rounded-full z-20 drop-shadow-[0_2px_2px_rgba(0,0,0,0.3)]'
        aria-label={isVideoPlaying ? 'Pause video icon' : 'Play video icon'}
      >
        {isVideoPlaying ? <Pause size={24} /> : <Play size={24} />}
      </button>
    </div>
  );
}
