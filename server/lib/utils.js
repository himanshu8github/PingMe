import jwt from 'jsonwebtoken';

export const generateToken = (userId, res) => {
  // create token
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  
  const isProduction = process.env.NODE_ENV === "production";

  // send token in cookie
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true,                     
      sameSite: isProduction ? "none" : "strict",
    secure: isProduction,  // HTTPS only in prod
  });

  return token;
};
