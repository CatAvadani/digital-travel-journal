import { ChevronDown, ChevronUp, Settings2 } from 'lucide-react';
import React, { useState } from 'react';
import {
  FILTER_OPTIONS,
  PostcardCustomSettings,
  SHADOW_OPTIONS,
} from '../../interfaces/postCard';
import styles from './postcard.module.scss';

interface PostcardControlsProps {
  onSettingsChange: (settings: PostcardCustomSettings) => void;
}

const PostcardControls: React.FC<PostcardControlsProps> = ({
  onSettingsChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [settings, setSettings] = useState<PostcardCustomSettings>({
    imageFilter: 'none',
    borderColor: '#ffffff',
    borderWidth: 5,
    borderRadius: 16,
    shadowIntensity: 'medium',
    textBackground: 'rgba(240, 240, 240, 0.1)',
  });

  const handleChange = <K extends keyof PostcardCustomSettings>(
    key: K,
    value: PostcardCustomSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    onSettingsChange(newSettings);
  };

  return (
    <div className='relative w-full max-w-md'>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='flex items-center gap-2 px-4 py-2 rounded-md secondary-btn'
        aria-expanded={isOpen}
        aria-controls='controls-panel'
      >
        <Settings2 className='w-4 h-4' />
        <span>Customize Postcard</span>
        {isOpen ? (
          <ChevronUp className='w-4 h-4 ml-2' />
        ) : (
          <ChevronDown className='w-4 h-4 ml-2' />
        )}
      </button>

      <div
        id='controls-panel'
        className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className='bg-black/30 p-4 rounded-md space-y-4'>
          <div className='space-y-2'>
            <label htmlFor='image-filter' className='block text-sm font-medium'>
              Image Filter
            </label>
            <select
              id='image-filter'
              className={`w-full bg-black/20 text-white border border-white/10 rounded-md p-2 ${styles.select}`}
              value={settings.imageFilter}
              onChange={(e) => handleChange('imageFilter', e.target.value)}
            >
              {Object.entries(FILTER_OPTIONS).map(([key, value]) => (
                <option key={key} value={value}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div className='space-y-2'>
            <label htmlFor='border-color' className='block text-sm font-medium'>
              Border Color
            </label>
            <div className='flex gap-2 items-center'>
              <input
                id='border-color'
                type='color'
                value={settings.borderColor}
                onChange={(e) => handleChange('borderColor', e.target.value)}
                className={`h-8 w-8 bg-transparent ${styles.colorPicker}`}
              />
              <span className='text-sm' aria-label='Selected color value'>
                {settings.borderColor}
              </span>
            </div>
          </div>

          <div className='space-y-2'>
            <label htmlFor='border-width' className='block text-sm font-medium'>
              Border Width ({settings.borderWidth}px)
            </label>
            <input
              id='border-width'
              type='range'
              min='0'
              max='20'
              value={settings.borderWidth}
              onChange={(e) =>
                handleChange('borderWidth', parseInt(e.target.value))
              }
              className={`w-full ${styles.slider}`}
            />
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='border-radius'
              className='block text-sm font-medium'
            >
              Border Radius ({settings.borderRadius}px)
            </label>
            <input
              id='border-radius'
              type='range'
              min='0'
              max='32'
              value={settings.borderRadius}
              onChange={(e) =>
                handleChange('borderRadius', parseInt(e.target.value))
              }
              className={`w-full ${styles.slider}`}
            />
          </div>

          <div className='space-y-2'>
            <label
              htmlFor='shadow-intensity'
              className='block text-sm font-medium'
            >
              Shadow Intensity
            </label>
            <select
              id='shadow-intensity'
              className={`w-full bg-black/20 text-white border border-white/10 rounded-md p-2 ${styles.select}`}
              value={settings.shadowIntensity}
              onChange={(e) =>
                handleChange(
                  'shadowIntensity',
                  e.target.value as PostcardCustomSettings['shadowIntensity']
                )
              }
            >
              {Object.keys(SHADOW_OPTIONS).map((key) => (
                <option key={key} value={key}>
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostcardControls;
