import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';
import { isTokenExpired } from '../utils/CheckToken';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const {SignUp} = useAuthStore()
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Signing Up with:', { email, password });
    const result = await SignUp({email,password})
    if(result.success) 
    {
      navigate('/otp')
    }
    // Add actual sign-up logic here (like POST to backend)
  };

  useEffect(() => {
      const token = localStorage.getItem('token') 
      if(token || isTokenExpired(token))
      {
        navigate('/home')
      }
    },[])

  return (
    <div className='h-screen w-full hero-bg bg-black text-white'>
      {/* Header with Netflix Logo and Sign In Button */}
      <header className='max-w-6xl flex justify-between items-center p-4 mx-auto'>
        <Link to='/'>
          <img src="/netflix-logo.png" alt="Netflix logo" className='w-52' />
        </Link>
        <Link to="/login">
          <button className='py-2 px-4 bg-red-600 rounded-md font-semibold hover:bg-red-700'>
            Sign In
          </button>
        </Link>
      </header>

      {/* Sign Up Form */}
      <div className='flex flex-col items-center justify-center text-center px-4 mt-20 space-y-6'>
        <h1 className='text-4xl md:text-5xl font-bold'>
          Create Your Account
        </h1>
        <p className='text-lg md:text-xl'>
          Join now and start watching.
        </p>

        <form
          className='w-full max-w-md space-y-4 mt-4'
          onSubmit={handleSignUp}
        >
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-md text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Create password"
            className="w-full px-4 py-3 rounded-md text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Confirm password"
            className="w-full px-4 py-3 rounded-md text-black"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className='w-full py-3 bg-red-600 text-white text-lg font-semibold rounded-md hover:bg-red-700'
          >
            Sign Up
          </button>
        </form>

        <p className='text-sm text-gray-400 mt-4'>
          Already have an account?{' '}
          <Link to="/login" className='text-red-500 hover:underline'>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;
