import Joi from 'joi';

export const sendResetEmailSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .required()
    .messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required',
    }),
});

export const resetPasswordSchema = Joi.object({
  token: Joi.string().required().messages({
    'string.base': 'Token must be a string',
    'any.required': 'Token is required',
    'string.empty': 'Token cannot be empty',
  }),
  password: Joi.string().min(6).max(15).required().messages({
    'string.base': 'Password must be a string',
    'string.min': 'Password must be at least 6 characters',
    'string.max': 'Password must be at most 15 characters',
    'any.required': 'Password is required',
  }),
});
