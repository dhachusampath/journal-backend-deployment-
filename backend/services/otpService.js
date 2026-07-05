const crypto = require("crypto");

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateOTPWithExpiry = () => {
  const otp = generateOTP();

  
  const expires = new Date(Date.now() + 10 * 60 * 1000);

  return { otp, expires };
};

const verifyOTP = (storedOTP, storedExpiry, providedOTP) => {
  if (!storedOTP || !storedExpiry) {
    return false;
  }

  const isExpired = new Date() > new Date(storedExpiry);

  if (isExpired) {
    return false;
  }

  return String(storedOTP) === String(providedOTP);
  console.log("Stored OTP:", user.resetPasswordOTP);
  console.log("Provided OTP:", otp);
  console.log("Stored Expiry:", user.resetPasswordOTPExpires);
};
module.exports = {
  generateOTP,
  generateOTPWithExpiry,
  verifyOTP,
};
