'use client';

import { MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuthStore } from '../lib/useAuthStore';

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const { signIn, signUp, error, loading } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<FormData> = async ({ email, password }) => {
    try {
      if (isLogin) {
        await signIn(email, password, router);
      } else {
        await signUp(email, password, router);
      }
    } catch (err) {
      console.error('Authentication Error:', err);
    }
  };

  return (
    <div
      className='bg-white bg-opacity-5 border border-white border-opacity-10 
      backdrop-blur-3xl backdrop-filter py-8 rounded-md sm:p-20 sm:rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)]'
    >
      <div className='flex flex-col items-center justify-center gap-4'>
        <h2 className='text-2xl font-bold text-white'>
          {isLogin ? 'Sign In' : 'Sign Up'}
        </h2>
        <p className='text-white'>
          {isLogin
            ? 'Welcome back! Please sign in to continue.'
            : 'Create an account to start your travel journal.'}
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-transparent p-2 w-80  md:w-96'
        >
          {error && (
            <p className='text-red-500 mb-4'>
              {/* Todo: Temporary error messages. Replace with proper error handling. */}
              {error === 'auth/user-not-found'
                ? 'User not found'
                : error === 'auth/wrong-password'
                ? 'Invalid password'
                : error === 'auth/email-already-in-use'
                ? 'Email already in use'
                : 'An error occurred. Please try again later.'}
            </p>
          )}

          <div className='mb-4 text-white'>
            <label htmlFor='email' className='block mb-2'>
              Email
            </label>
            <input
              type='email'
              id='email'
              placeholder='johndoe@mail.com'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              className='w-full px-3 py-2 rounded-md bg-[#BC93EA33]'
            />
            {errors.email && (
              <p className='text-red-500 text-sm'>{errors.email.message}</p>
            )}
          </div>

          <div className='mb-4 text-white'>
            <label htmlFor='password' className='block mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              placeholder='Minimum 6 characters'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters long',
                },
              })}
              className='w-full px-3 py-2 rounded-md bg-[#BC93EA33]'
            />
            {errors.password && (
              <p className='text-red-500 text-sm'>{errors.password.message}</p>
            )}
          </div>

          <button
            type='submit'
            disabled={!isValid || loading}
            className={`w-full py-2 rounded ${
              !isValid || loading
                ? 'bg-gradient-to-r from-[#D92F91]/40 to-[#800080]/40 hover:from-[#C71585]/40 hover:to-[#4B0082]/40 text-white/70 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#D92F91] to-[#800080] hover:from-[#C71585] hover:to-[#4B0082] text-white'
            }`}
          >
            {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
          </button>

          <p className='mt-4 text-center text-white'>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <button
              type='button'
              onClick={() => setIsLogin(!isLogin)}
              className='text-pink-500 hover:underline'
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </form>
      </div>
      <div className='absolute right-[50%] -translate-[50%] sm:right-6 sm:-bottom-6 bg-white/10 backdrop-blur-sm rounded-lg p-2  shadow-[0_0_15px_rgba(255,255,255,0.2)]'>
        <MapPin className='size-14 sm:size-20 text-[#D92F91]' />
      </div>
    </div>
  );
}
