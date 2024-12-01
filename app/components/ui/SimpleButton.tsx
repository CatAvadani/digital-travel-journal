import React from 'react';

interface ButtonProps {
  text: string;
  type?: 'button' | 'submit';
  onClick?: () => void;
  backgroundColor: string;
  textColor?: string;
  disabled?: boolean;
  className?: string;
}

const SimpleButton: React.FC<ButtonProps> = ({
  text,
  onClick,
  backgroundColor,
  type = 'button',
  disabled = false,
  textColor = 'text-white',
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 min-h-12 rounded-md transition-all ${textColor} ${backgroundColor} ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'
      }`}
    >
      {text}
    </button>
  );
};

export default SimpleButton;
