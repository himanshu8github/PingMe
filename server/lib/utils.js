import jwt from 'jsonwebtoken';

export const generateToken= (userId, res) => {

  // creating token
  const token = jwt.sign({userId}, process.env.JWT_SECRET, {
    expiresIn : "7d"
  })

  // sending token to cookie
  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, //millisecond
    httpOnly : true,
    sameSite : "strict",
    secure: process.env.NODE_ENV !== "development"
  });

  return token;
}