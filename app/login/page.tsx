'use client';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import useAuthStore from '../lib/store';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const { signIn, signUp, loading, error } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await signUp(email, password);
      } else {
        await signIn(email, password);
        if (!error) {
          router.push('/explore');
        }
      }
    } catch (err) {
      console.error('Error during authentication', err);
    }
  };

  return (
    <div className='min-h-screen flex items-center justify-center'>
      <form
        onSubmit={handleSubmit}
        className='bg-white p-8 rounded shadow-md w-96'
      >
        <h2 className='text-2xl mb-4'>{isSignUp ? 'Sign Up' : 'Sign In'}</h2>

        {error && <p className='text-red-500 mb-4'>{error}</p>}

        <div className='mb-4'>
          <label htmlFor='email' className='block mb-2'>
            Email
          </label>
          <input
            type='email'
            id='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className='w-full px-3 py-2 border rounded'
          />
        </div>

        <div className='mb-4'>
          <label htmlFor='password' className='block mb-2'>
            Password
          </label>
          <input
            type='password'
            id='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className='w-full px-3 py-2 border rounded'
          />
        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600'
        >
          {loading ? 'Loading...' : isSignUp ? 'Sign Up' : 'Sign In'}
        </button>

        <p className='mt-4 text-center'>
          {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
          <button
            type='button'
            onClick={() => setIsSignUp(!isSignUp)}
            className='text-blue-500 hover:underline'
          >
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </button>
        </p>
      </form>
    </div>
  );
}
