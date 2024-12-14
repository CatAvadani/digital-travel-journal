'use client';

import { FirebaseError } from 'firebase/app';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Eye, EyeOff } from 'react-feather';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useAuthStore } from '../store/useAuthStore';

interface FormData {
  email: string;
  password: string;
}

export default function Login() {
  const [isSignIn, setIsSignIn] = useState(false);
  const { signIn, signUp, error, loading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
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
      const accessedRoute = localStorage.getItem('accessedRoute');

      if (isSignIn) {
        await signIn(email, password);
        router.push(accessedRoute || '/dashboard');
        localStorage.removeItem('accessedRoute');
      } else {
        await signUp(email, password);
        router.push('/dashboard');
      }
    } catch (err) {
      if (err instanceof FirebaseError) {
        console.error('Firebase Error:', err.message);
        if (!isSignIn && err.code === 'auth/email-already-in-use') {
          setIsSignIn(true);
        }
      } else {
        console.error('Unexpected Error:', err);
      }
    }
  };

  return (
    <div
      aria-label='Sign In or Sign Up Form'
      className='bg-black/10 border border-white/10
      backdrop-blur-3xl backdrop-filter py-8 rounded-md sm:p-20 sm:rounded-full w-[90%] sm:w-auto'
    >
      <div className='flex flex-col items-center justify-center gap-4'>
        <h1 className='text-2xl font-bold text-white'>
          {isSignIn ? 'Sign In' : 'Sign Up'}
        </h1>
        <p className='text-white px-2 text-center'>
          {isSignIn
            ? 'Welcome back! Please sign in to continue.'
            : 'Sign up to start your travel journal.'}
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
              onKeyDown={(e) => {
                if (e.key === ' ') {
                  e.preventDefault();
                }
              }}
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Invalid email address',
                },
              })}
              className='w-full px-3 py-2 rounded-md bg-[#110915]/50 border border-white/10'
            />
            {errors.email && (
              <p className='text-red-500 text-sm'>{errors.email.message}</p>
            )}
          </div>

          <div className='mb-6 text-white'>
            <label htmlFor='password' className='block'>
              Password
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                id='password'
                placeholder='Minimum 6 characters'
                onKeyDown={(e) => {
                  if (e.key === ' ') {
                    e.preventDefault();
                  }
                }}
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters long',
                  },
                  pattern: {
                    value: /^\S*$/,
                    message: 'Password cannot contain spaces',
                  },
                })}
                className='w-full px-3 py-2 rounded-md bg-[#110915]/50 border border-white/10'
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className='text-white/80 absolute right-5 top-1/2 -translate-y-1/2'
              >
                {showPassword ? (
                  <EyeOff className='size-5' aria-label='Hide password' />
                ) : (
                  <Eye className='size-5' aria-label='Show password' />
                )}
              </button>
            </div>
            {errors.password && (
              <p className='text-red-500 text-sm'>{errors.password.message}</p>
            )}
          </div>
          <button
            type='submit'
            disabled={!isValid || loading}
            className={`w-full py-2 rounded-md font-bold ${
              !isValid || loading
                ? 'bg-gradient-to-r from-[#f6a5c1]/30 to-[#4B0082]/30 text-white/50 cursor-not-allowed border border-white/10'
                : 'bg-gradient-to-r from-[#D92F91] to-[#800080] hover:from-[#C71585] hover:to-[#4B0082] text-white'
            }`}
          >
            {loading ? 'Processing...' : isSignIn ? 'Sign In' : 'Sign Up'}
          </button>

          <p className='mt-4 text-center text-white'>
            {isSignIn ? "Don't have an account? " : 'Already have an account? '}
            <button
              type='button'
              onClick={() => setIsSignIn(!isSignIn)}
              aria-controls='login-form'
              className='text-pink-500 hover:underline text-lg font-bold'
            >
              {isSignIn ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}
