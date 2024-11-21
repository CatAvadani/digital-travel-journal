'use client';

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
    <div className='flex flex-col items-center justify-center gap-4'>
      <h2 className='text-2xl font-bold'>{isLogin ? 'Sign In' : 'Sign Up'}</h2>
      <p className='text-gray-500'>
        {isLogin
          ? 'Welcome back! Please sign in to continue.'
          : 'Create an account to start your travel journal.'}
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='bg-white p-2 w-80  md:w-96'
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

        <div className='mb-4'>
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
            className='w-full px-3 py-2 border rounded'
          />
          {errors.email && (
            <p className='text-red-500 text-sm'>{errors.email.message}</p>
          )}
        </div>

        <div className='mb-4'>
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
            className='w-full px-3 py-2 border rounded'
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
              ? 'bg-gray-300 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {loading ? 'Processing...' : isLogin ? 'Sign In' : 'Sign Up'}
        </button>

        <p className='mt-4 text-center'>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button
            type='button'
            onClick={() => setIsLogin(!isLogin)}
            className='text-blue-500 hover:underline'
          >
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </form>
    </div>
  );
}
