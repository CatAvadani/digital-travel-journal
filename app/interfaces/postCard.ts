export interface Postcard {
  userId: string;
  image: string | null;
  template: number;
  message: string;
  shareableURL?: string;
}

export interface PostcardCustomSettings {
  imageFilter: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  shadowIntensity: 'none' | 'light' | 'medium' | 'strong';
  textBackground: string;
}

export const SHADOW_OPTIONS = {
  none: '0 0 0 rgba(0,0,0,0)',
  light: '0 4px 6px rgba(0,0,0,0.1)',
  medium: '0 8px 12px rgba(0,0,0,0.2)',
  strong: '0 12px 24px rgba(0,0,0,0.3)',
} as const;

export const FILTER_OPTIONS = {
  none: 'none',
  grayscale: 'grayscale(100%)',
  sepia: 'sepia(100%)',
  blur: 'blur(1px)',
  brightness: 'brightness(120%)',
  contrast: 'contrast(120%)',
} as const;
