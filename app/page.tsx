'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Footer from './components/Footer';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.playbackRate = 1;
      video.defaultPlaybackRate = 1;
    }
  }, []);

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
      <div className='absolute hidden sm:block z-50 top-1/2 -ml-[7%]  transform -translate-y-1/2 -rotate-90 text-white text-lg md:text-2xl lg:text-3xl font-semibold tracking-widest opacity-80'>
        Digital Travel Journal
      </div>
      <video
        ref={videoRef}
        className='absolute top-0 left-0 w-full h-full object-cover'
        autoPlay
        muted
        loop
        playsInline
        aria-label='Globe Video Background'
      >
        <source src='/globe-video-1.mp4' type='video/mp4' />
        Your browser does not support the video tag.
      </video>

      {/* Glass Effect Overlay */}
      <div
        className='absolute top-0 left-0 h-full w-1/2 bg-white bg-opacity-10 backdrop-blur-md backdrop-filter z-10'
        style={{
          clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        }}
      ></div>
      <Footer positionClass='bottom-10 sm:left-24 md:left-32' />
      <div className='z-20 text-white text-center absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] w-[70%]'>
        <h1 className='text-3xl md:text-5xl lg:text-7xl mb-14 sm:mb-20 max-w-3xl mx-auto font-normal sm:leading-loose tracking-wide'>
          Turn Your Journeys into Timeless Stories
        </h1>
        <Link
          href='/mapView'
          className='bg-gradient-to-r  from-[#E91E63] to-[#4B0082] hover:from-[#eb3473] hover:to-[#800080] px-4 sm:px-16 py-3 rounded-full text-white shadow-lg transition-all duration-300 ease-in-out'
        >
          Begin Your Journey
        </Link>
      </div>
      {/* Play/Pause Button */}
      <button
        onClick={toggleVideoPlayback}
        className='absolute bottom-8 right-4 sm:right-10 bg-white/10 backdrop-blur-lg backdrop-filter text-white text-sm md:text-base px-4 py-2 rounded-full z-50 w-32 '
        aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
      >
        {isVideoPlaying ? 'Pause Video' : 'Play Video'}
      </button>
    </div>
  );
}
