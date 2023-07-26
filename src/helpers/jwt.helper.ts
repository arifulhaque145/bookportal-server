import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

// Generate access token
const generateToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

// Generate refresh token
function generateRefreshToken(
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string
): string {
  const refreshToken = jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
  return refreshToken;
}

// Veryfy Token
function verifyToken(token: string, secret: Secret): JwtPayload {
  const decoded = jwt.verify(token, secret) as JwtPayload;
  return decoded;
}

export const jwtHelpers = {
  generateToken,
  generateRefreshToken,
  verifyToken,
};
