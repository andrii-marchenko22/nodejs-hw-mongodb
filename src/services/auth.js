import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';
import generateTokens from '../utils/tokens.js';

export const registerUser = async (payload) => {
  const checkingUser = await User.findOne({ email: payload.email });
  if (checkingUser) {
    throw createHttpError(409, 'Email in use');
  }

  const hashedPassword = await bcrypt.hash(payload.password, 10);

  const newUser = await User.create({
    ...payload,
    password: hashedPassword,
  });

  return newUser;
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw createHttpError(401, 'Unauthorized');
  }

  await Session.deleteOne({ userId: user._id });

  const newSession = generateTokens();

  const setupSession = await Session.create({
    userId: user._id,
    ...newSession,
  });

  return setupSession;
};

export const refreshUserSession = async ({ refreshToken, sessionId }) => {
  const session = await Session.findOne({ _id: sessionId, refreshToken });
  if (!session) {
    throw createHttpError(401, 'Session not found');
  }
  const isExpir = new Date() > new Date(session.refreshTokenValidUntil);

  if (isExpir) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = generateTokens();

  await Session.deleteOne({ _id: sessionId, refreshToken });

  return await Session.create({
    userId: session.userId,
    ...newSession,
  });
};

export const logoutUser = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};
