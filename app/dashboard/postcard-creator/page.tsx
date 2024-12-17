'use client';

import SimpleButton from '@/app/components/ui/SimpleButton';
import {
  PostcardCustomSettings,
  SHADOW_OPTIONS,
} from '@/app/interfaces/postCard';
import { savePostcard, uploadToFirebase } from '@/app/store/firestoreHelpers';
import { useAuthStore } from '@/app/store/useAuthStore';
import * as htmlToImage from 'html-to-image';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, ChevronUp, Folder } from 'react-feather';
import toast from 'react-hot-toast';
import useEntryStore from '../../store/useEntryStore';
import styles from './postcard.module.scss';
import PostcardControls from './PostCardControls';

interface PostcardData {
  selectedImage: string | null;
  selectedTemplate: number;
  message: string;
}

const postcardTemplates = [
  { id: 1, name: 'Classic', className: 'template-classic' },
  { id: 2, name: 'Modern', className: 'template-modern' },
  { id: 3, name: 'Elegant', className: 'template-elegant' },
];

export default function PostcardCreator() {
  const { entries, fetchEntries } = useEntryStore();
  const { user } = useAuthStore();
  const postcardRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState(0);
  const [isTemplateOpen, setIsTemplateOpen] = useState(false);

  const [customSettings, setCustomSettings] = useState<PostcardCustomSettings>({
    imageFilter: 'none',
    borderColor: '#ffffff',
    borderWidth: 5,
    borderRadius: 16,
    shadowIntensity: 'medium',
    textBackground: 'rgba(240, 240, 240, 0.1)',
  });

  const [postcardData, setPostcardData] = useState<PostcardData>({
    selectedImage: '',
    selectedTemplate: 0,
    message: '',
  });

  useEffect(() => {
    if (user) fetchEntries(user.uid);
  }, [user, fetchEntries]);

  const handleSavePostcard = async () => {
    const { selectedImage, selectedTemplate, message } = postcardData;

    if (!selectedImage || !selectedTemplate || !message) {
      toast.error('Please select an image, template, and write a message.');
      return;
    }

    if (!user) {
      toast.error('You need to log in to save postcards.');
      return;
    }

    setLoading(true);
    try {
      const element = postcardRef.current;
      if (!element) return;

      const images = element.getElementsByTagName('img');
      await Promise.all(
        Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
          });
        })
      );

      await new Promise((resolve) => setTimeout(resolve, 100));

      const dataUrl = await htmlToImage.toPng(element, {
        quality: 0.95,
        pixelRatio: 2,
        skipAutoScale: true,
        cacheBust: true,
        fetchRequestInit: {
          mode: 'cors',
          credentials: 'omit',
        },
      });

      // Create blob from dataUrl
      const blob = await fetch(dataUrl).then((res) => res.blob());
      const file = new File([blob], `postcard-${Date.now()}.png`, {
        type: 'image/png',
      });

      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image is too large. Please try with a smaller image.');
        return;
      }

      const uploadedUrl = await uploadToFirebase(dataUrl);

      if (!uploadedUrl) {
        toast.error('Failed to upload postcard image. Please try again.');
        return;
      }

      await savePostcard({
        userId: user.uid,
        image: uploadedUrl,
        template: selectedTemplate,
        message,
      });

      toast.success('Postcard saved successfully!');
      resetFields();
      setKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error('Error saving postcard:', error);
      toast.error('Failed to save postcard. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const resetFields = () => {
    setPostcardData({ selectedImage: null, selectedTemplate: 0, message: '' });
  };

  const updateField = <Key extends keyof PostcardData>(
    field: Key,
    value: PostcardData[Key]
  ) => {
    setPostcardData((prev) => ({ ...prev, [field]: value }));

    if (field === 'selectedImage') {
      setKey((prevKey) => prevKey + 1);
    }
    document
      .getElementById('template-section')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  const { selectedImage, selectedTemplate, message } = postcardData;

  const handleCustomSettingsChange = (newSettings: PostcardCustomSettings) => {
    setCustomSettings(newSettings);
  };

  const postcardStyle = {
    '--image-filter': customSettings.imageFilter,
    '--border-color': customSettings.borderColor,
    '--border-width': `${customSettings.borderWidth}px`,
    '--border-radius': `${customSettings.borderRadius}px`,
    '--shadow': SHADOW_OPTIONS[customSettings.shadowIntensity],
  } as React.CSSProperties;

  return (
    <div className=' md:p-4 text-white '>
      <h1 className='text-base sm:text-lg sm:font-semibold my-10'>
        Choose your favorite photo, pick a template, and add <br /> a message to
        create your unique postcard.
      </h1>

      <div className='flex flex-col gap-10'>
        <div className='rounded-md'>
          <h2 className='text-base sm:text-lg font-semibold py-4'>
            Choose an Image
          </h2>
          {entries.length === 0 ? (
            <div className='text-white/80 px-4 py-6 border border-white/20 border-dashed rounded-md max-w-xl text-center my-10 mb-20'>
              No images found. Add some trips to get started.
            </div>
          ) : (
            <div className='grid gap-3 grid-cols-[repeat(auto-fill,minmax(100px,1fr))] max-h-[270px] overflow-y-scroll rounded-md bg-black/30 p-4 max-w-3xl'>
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  onClick={() => updateField('selectedImage', entry.image)}
                  className={`relative w-full h-[100px] cursor-pointer ${
                    selectedImage === entry.image
                      ? 'ring-4 rounded-md ring-[#b759fb]'
                      : ''
                  }`}
                >
                  <Image
                    src={entry.image}
                    alt=''
                    fill
                    sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                    className='rounded-md shadow-md h-full w-full object-cover'
                  />
                  <div className='absolute top-0 left-0 w-full h-full bg-black/30 flex justify-center items-center p-4 text-sm font-semibold'>
                    {entry.title}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className='flex justify-start mt-4'>
            <button
              className='p-2 text-white rounded-full bg-[#110915] border border-white/10 hover:scale-105 transition-all mt-4'
              onClick={() =>
                document
                  .getElementById('template-section')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
              aria-label='Scroll to templates'
            >
              <ChevronDown className='size-6' />
            </button>
          </div>
        </div>
        <Link
          href='/dashboard/savedPostcards'
          className='flex items-center gap-2 px-4 py-2 primary-btn rounded-md w-[fit-content]'
        >
          <Folder className='w-6 h-6' />
          <span className=' text-white'>View Saved Postcards</span>
        </Link>
        <p className='text-white/80'>
          Customize your postcard with the options below and write your message.
        </p>
        <div className='flex flex-col-reverse lg:flex-row gap-8 justify-between'>
          <div id='template-section' className='sm:w-1/2'>
            <div className='pb-4 '>
              <div
                className='relative w-60
               sm:w-full md:w-[50%]'
              >
                <h2 className='text-base sm:text-lg font-semibold py-4'>
                  Choose a Template
                </h2>
                <button
                  onClick={() => setIsTemplateOpen(!isTemplateOpen)}
                  className='w-full flex items-center justify-between text-white secondary-btn rounded-md px-4 py-2'
                >
                  <span>
                    {selectedTemplate
                      ? postcardTemplates.find((t) => t.id === selectedTemplate)
                          ?.name
                      : 'Select a Template'}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${
                      isTemplateOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isTemplateOpen && (
                  <div className='absolute w-full mt-2 bg-[#110915] border border-white/10 rounded-md shadow-xl z-10 overflow-hidden'>
                    {postcardTemplates.map((template) => (
                      <div
                        key={template.id}
                        onClick={() => {
                          updateField('selectedTemplate', template.id);
                          setIsTemplateOpen(false);
                        }}
                        className={`px-4 py-3 cursor-pointer transition-colors ${
                          selectedTemplate === template.id
                            ? 'bg-gradient-to-r from-[#E91E63] to-[#4B0082] text-white'
                            : 'hover:bg-black/40 text-white/90'
                        }`}
                      >
                        {template.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Postcard Preview */}
            <div className='mt-6 '>
              <h2 className='text-lg font-semibold my-4'>Preview Image</h2>
              {!selectedImage || !selectedTemplate ? (
                <div className='text-white/80 px-4 py-6 border border-white/20 border-dashed rounded-md max-w-md text-center my-10 mb-20'>
                  Select an image and template to see the preview here.
                </div>
              ) : (
                <div>
                  <div
                    ref={postcardRef}
                    id='postcard-preview'
                    key={key}
                    style={postcardStyle}
                    className={`postcard-preview w-full flex flex-col items-center max-w-md mb-16 rounded-md shadow-lg relative ${
                      styles[
                        postcardTemplates.find((t) => t.id === selectedTemplate)
                          ?.className || ''
                      ]
                    }`}
                  >
                    <Image
                      key={`${selectedImage}-${key}`}
                      src={selectedImage || '/default-img.jpg'}
                      alt='Selected'
                      className={`postcard-image ${styles['postcard-image']}`}
                      width={300}
                      height={200}
                      priority={true}
                      unoptimized={true}
                      crossOrigin='anonymous'
                    />
                    <textarea
                      value={message}
                      rows={3}
                      aria-label='Postcard message'
                      onChange={(e) => updateField('message', e.target.value)}
                      placeholder='Write your message here...'
                      className={`postcard-text placeholder:text-white/80 ${styles['postcard-text']}`}
                    />
                  </div>
                  <div className='my-6 flex gap-4'>
                    <SimpleButton
                      text={loading ? 'Saving...' : 'Save Postcard'}
                      onClick={handleSavePostcard}
                      backgroundColor='primary-btn'
                    />
                    <button
                      className='secondary-btn px-4 py-2 rounded-md'
                      onClick={resetFields}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Custom Settings */}
          <div className='sm:w-1/2'>
            <h2 className='text-lg font-semibold my-4'>Custom Settings</h2>
            <PostcardControls onSettingsChange={handleCustomSettingsChange} />
          </div>
        </div>
      </div>

      <div className='flex justify-start mt-4'>
        <button
          className='p-2 text-white rounded-full bg-[#110915] border border-white/10 hover:scale-105 transition-all mt-4'
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label='Scroll to top'
        >
          <ChevronUp className='size-6' />
        </button>
      </div>
    </div>
  );
}
