import { isHttpError } from 'http-errors';

export const errorHandler = (error, req, res, next) => {
  if (isHttpError(error)) {
    res.status(error.status).json({
      status: error.status,
      message: error.message,
      data: error,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    errorMessage: 'Something went wrong',
    data: error.message,
  });
};
