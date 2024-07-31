module.exports = {
  DB_NAME:"Curlytails",
  BASE_URL: "/api/v1",
  hash: 14,
  otpType: {
    LOGIN: 0,
    FORGOT_PASSWORD: 1,
  },
  cookieOptions: {
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in milliseconds
    sameSite: "none",
    httpOnly: true,
    secure: true,
  },
};
