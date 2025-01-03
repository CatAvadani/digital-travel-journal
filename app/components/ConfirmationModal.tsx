import React, { useEffect } from 'react';
import { AlertTriangle } from 'react-feather';
import SimpleButton from './ui/SimpleButton';

interface ConfirmationModalProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/20  backdrop-blur-sm z-50'>
      <div className='bg-[#2C1735] py-4 sm:py-8 px-4 sm:px-6 rounded-md shadow-md flex flex-col justify-center items-center'>
        <AlertTriangle className=' text-[#E91E63] cursor-pointer size-8 sm:size-12' />
        <p className='text-white my-6 sm:my-10 text-center max-w-64 sm:max-w-full'>
          {message}
        </p>
        <div className='flex justify-center items-center gap-4'>
          <SimpleButton
            text='Cancel'
            onClick={onCancel}
            backgroundColor='bg-gray-200'
            textColor='text-gray-800'
            className='hover:bg-gray-300'
          />
          <SimpleButton
            text='Confirm'
            onClick={onConfirm}
            backgroundColor='bg-gradient-to-r from-[#E91E63] to-[#4B0082] '
            textColor='text-white'
            className=' hover:from-[#E91E63]/80 hover:to-[#4B0082]/80'
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
