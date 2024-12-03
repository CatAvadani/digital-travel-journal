import { MapPin } from 'lucide-react';
import { Camera, Clipboard } from 'react-feather';
export const cardData = [
  {
    id: 1,
    title: 'Step 1: Pin your location on the map',
    description: 'Select your trip location using our interactive map.',
    icon: MapPin,
  },
  {
    id: 2,
    title: 'Step 2: Create your travel entry',
    description: 'Start adding your travel details to your travel log.',
    icon: Clipboard,
  },
  {
    id: 3,
    title: 'Step 3: Add a travel photo',
    description: 'Upload your travel photos to your travel log.',
    icon: Camera,
  },
];

export default cardData;
