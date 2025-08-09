import API from './api';

// Combined send-otp for both new & existing
export const sendOtp = async (data) => {
  return API.post('/users/send-otp', data);
};

// Verify OTP
export const verifyOtp = async (data) => {
  return API.post('/users/verify-otp', data);
};
