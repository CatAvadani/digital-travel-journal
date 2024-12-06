'use client';

import { FirebaseError } from 'firebase/app';
import { MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuthStore } from '../store/useAuthStore';

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [isLogin, setIsLogin] = useState(false);
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
      if (err instanceof FirebaseError) {
        console.error('Firebase Error:', err.message);
        if (!isLogin && err.code === 'auth/email-already-in-use') {
          setIsLogin(true);
        }
      } else {
        console.error('Unexpected Error:', err);
      }
    }
  };

  return (
    <div
      aria-label='Login or Sign Up Form'
      className='bg-white bg-opacity-5 border border-white border-opacity-10 
      backdrop-blur-3xl backdrop-filter py-8 rounded-md sm:p-20 sm:rounded-full shadow-[0_0_15px_rgba(255,255,255,0.2)] w-[90%] sm:w-auto'
    >
      <div className='flex flex-col items-center justify-center gap-4'>
        <h2 className='text-2xl font-bold text-white'>
          {isLogin ? 'Sign In' : 'Sign Up'}
        </h2>
        <p className='text-white px-2 text-center'>
          {isLogin
            ? 'Welcome back! Please sign in to continue.'
            : 'Create an account to start your travel journal.'}
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className='bg-transparent p-2 w-full md:w-96'
        >
          {error && (
            <p className='text-red-500 mb-4'>
              {error === 'auth/user-not-found'
                ? 'No account found with this email. Please sign up.'
                : error === 'auth/wrong-password'
                ? 'Incorrect password. Please try again.'
                : error === 'auth/invalid-email'
                ? 'Invalid email address format.'
                : error === 'auth/email-already-in-use'
                ? 'Email is already registered. Please sign in.'
                : error === 'auth/weak-password'
                ? 'Password is too weak. Please use a stronger password.'
                : error === 'auth/too-many-requests'
                ? 'Too many login attempts. Please try again later.'
                : error === 'auth/network-request-failed'
                ? 'Network error. Please check your connection.'
                : `An unexpected error occurred (${error}). Please try again.`}
            </p>
          )}

          <div className='mb-4 text-white'>
            <label htmlFor='email' className='block'>
              Email
            </label>
            <input
              type='email'
              id='email'
              placeholder='johndoe@mail.com'
              aria-invalid={!!errors.email}
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

          <div className='mb-6 text-white'>
            <label htmlFor='password' className='block'>
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
              aria-controls='login-form'
              className='text-pink-500 hover:underline text-lg font-bold '
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </form>
      </div>
      <div className='absolute left-1/2 -bottom-2 -translate-x-1/2 translate-y-1/2 sm:right-6 sm:-bottom-6 sm:translate-y-0 sm:left-auto bg-white/10 backdrop-blur-sm rounded-lg p-2 shadow-[0_0_15px_rgba(255,255,255,0.2)]'>
        <MapPin className='w-10 h-10 sm:w-16 sm:h-16 text-[#D92F91]' />
      </div>
    </div>
  );
}
