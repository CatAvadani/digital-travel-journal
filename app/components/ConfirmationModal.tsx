import React from 'react';
import { AlertTriangle } from 'react-feather';

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
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex items-center justify-center bg-black/20  backdrop-blur-sm z-50'>
      <div className='bg-white py-4 sm:py-8 px-4 sm:px-6 rounded-md shadow-md flex flex-col justify-center items-center'>
        <AlertTriangle className=' text-[#E91E63] cursor-pointer size-8 sm:size-12' />
        <p className='text-gray-800 my-6 sm:my-10 text-center max-w-64 sm:max-w-full'>
          {message}
        </p>
        <div className='flex justify-end gap-2'>
          <button
            onClick={onCancel}
            className='px-4 py-2 rounded-md bg-gradient-to-r from-slate-200 to-slate-500 hover:from-gray-200 hover:to-gray-400'
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className='bg-gradient-to-r from-[#E91E63] to-[#4B0082] hover:from-[#eb3473] hover:to-[#800080] text-white px-4 py-2 rounded-md '
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
