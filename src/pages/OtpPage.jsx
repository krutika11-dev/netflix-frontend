import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';
import { verifyOtp } from '../api/authApi';
import useAuthStore from '../store/AuthStore';

const OtpPage = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();
  const email = useAuthStore((state) => state.email);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      alert('Enter a valid 6-digit OTP');
      return;
    }

    try {
      const res = await verifyOtp({ email, otp: Number(otp) });
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      console.error('❌ OTP verify failed:', err);
      alert(err.response?.data?.message || 'Invalid OTP');
    }
  };

  return (
    <div
      className="h-screen w-full bg-black text-white flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(/hero.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="bg-black bg-opacity-70 p-8 rounded-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Enter OTP</h1>
        <p className="mb-6">
          We sent a 6-digit OTP to: <b>{email}</b>
        </p>

        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={6}
          shouldAutoFocus
          inputStyle={{
            width: '3rem',
            height: '3rem',
            margin: '0 0.5rem',
            fontSize: '1.5rem',
            borderRadius: '0.25rem',
            border: '1px solid #fff',
            backgroundColor: 'transparent',
            color: '#fff',
          }}
          renderInput={(props) => <input {...props} />}
        />

        <button
          onClick={handleVerify}
          className="mt-6 py-2 px-6 bg-red-600 rounded-md font-semibold hover:bg-red-700"
        >
          Verify OTP
        </button>
      </div>
    </div>
  );
};

export default OtpPage;
