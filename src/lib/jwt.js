import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.NEXT_PRIVATE_JWT_SECRET;

export function generateToken(user, expiresIn = "30d") {
  return jwt.sign(
    {
      email: user.email,
      name: user.name,
      purchased: true,
    },
    JWT_SECRET,
    { expiresIn }
  );
}


export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}
