import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/AuthStore';
import { isTokenExpired } from '../utils/CheckToken';
import { sendOtp } from '../api/authApi';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const setEmailStore = useAuthStore((state) => state.setEmail);

  const handleSendOtp = async (e) => {
    e.preventDefault();

    try {
      await sendOtp({ email });

      setEmailStore(email);

      navigate('/otp');
    } catch (err) {
      console.error('❌ Send OTP error:', err);
      alert(err.response?.data?.message || 'Failed to send OTP!');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isTokenExpired(token)) {
      navigate('/home');
    }
  }, [navigate]);

  return (
    <div className="h-screen w-full hero-bg bg-black bg-cover bg-center text-white">
      <header className="max-w-6xl flex justify-between items-center p-4 mx-auto">
        <Link to="/">
          <img src="/netflix-logo.png" alt="Netflix logo" className="w-52" />
        </Link>
      </header>

      <div className="flex flex-col items-center justify-center text-center px-4 mt-20 space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">
          Unlimited movies, TV shows and more
        </h1>
        <p className="text-lg md:text-xl">
          Enter your email to get started.
        </p>

        <form className="w-full max-w-md space-y-4" onSubmit={handleSendOtp}>
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-md text-white focus:outline-white border-2 border-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-md hover:bg-blue-700"
          >
            Send OTP
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
