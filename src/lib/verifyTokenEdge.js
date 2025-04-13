import { jwtVerify } from 'jose';

export async function verifyTokenEdge(token) {
  try {
    const secret = new TextEncoder().encode(process.env.NEXT_PRIVATE_JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    return null;
  }
}
