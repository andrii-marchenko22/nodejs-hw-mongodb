import {
  loginUser,
  logoutUser,
  refreshUserSession,
  registerUser,
  resetPassword,
  sendResetToken,
} from '../services/auth.js';
import { SessionCookies } from '../utils/cookies.js';

export const registerUserController = async (req, res) => {
  const newUser = await registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: newUser,
  });
};

export const loginUserController = async (req, res) => {
  const session = await loginUser(req.body);

  SessionCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const refreshUserSessionController = async (req, res) => {
  const { sessionId, refreshToken } = req.cookies;
  const session = await refreshUserSession({ sessionId, refreshToken });

  SessionCookies(res, session);

  res.status(200).json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

export const logoutUserController = async (req, res) => {
  const { sessionId } = req.cookies;
  if (sessionId) {
    await logoutUser(sessionId);
  }

  res.clearCookie('refreshToken');
  res.clearCookie('sessionId');

  res.status(204).send();
};

export const sendResetEmailController = async (req, res) => {
  const { email } = req.body;
  await sendResetToken(email);

  res.status(200).json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};

export const resetPasswordController = async (req, res) => {
  const { token, password } = req.body;
  await resetPassword(token, password);

  res.status(200).json({
    status: 200,
    message: 'Password has been successfully reset.',
    data: {},
  });
};
