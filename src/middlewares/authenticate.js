import createHttpError from 'http-errors';
import { Session } from '../db/models/session';
import { User } from '../db/models/user';

const authenticate = async (req, res, next) => {
  const authHader = req.get('Authorization');

  if (!authHader) {
    next(createHttpError(401, 'Please provide Authorization header'));
    return;
  }

  const [bearer, token] = authHader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    next(createHttpError(401, 'Auth header should be of type Bearer'));
    return;
  }

  const session = await Session.findOne({ accessToken: token });

  if (!session) {
    next(createHttpError(401, 'Session not found'));
    return;
  }

  const isExpir = new Date() > new Date(session.accessTokenValidUntil);

  if (isExpir) {
    next(createHttpError(401, 'Access token expired'));
    return;
  }

  const user = await User.findById(session.userId);

  if (!user) {
    next(createHttpError(401, 'User not found'));
    return;
  }

  req.user = user;

  next();
};

export default authenticate;
