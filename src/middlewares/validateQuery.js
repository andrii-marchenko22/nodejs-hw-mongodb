import createHttpError from 'http-errors';

export const validateQuery = (schema) => async (req, res, next) => {
  try {
    const value = await schema.validateAsync(req.query, {
      abortEarly: false,
      convert: true,
    });
    req.query = value;
    next();
  } catch (e) {
    const error = createHttpError(400, 'Bad request', {
      error: e.details,
    });
    next(error);
  }
};
