import { RotatingLines } from 'react-loader-spinner';

export default function LoadingSpinner() {
  return (
    <div className='absolute inset-0 flex justify-center items-center z-50'>
      <RotatingLines
        strokeColor='#B75E7C'
        strokeWidth='5'
        ariaLabel='rotating-lines-loading'
        animationDuration='0.75'
        width='64'
        visible={true}
      />
    </div>
  );
}
