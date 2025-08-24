import Joi from 'joi';

export const registerValidationSchema = Joi.object({
  name: Joi.string().min(3).max(20).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name must be at most 20 characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .required()
    .messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string().min(6).max(15).required().messages({
    'string.base': 'Password must be a string',
    'string.min': 'Password must be at least 6 characters',
    'string.max': 'Password must be at most 15 characters',
    'any.required': 'Password is required',
  }),
});

export const loginValidationSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .trim()
    .required()
    .messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be a valid email address',
      'any.required': 'Email is required',
    }),
  password: Joi.string().min(6).max(15).required().messages({
    'string.base': 'Password must be a string',
    'string.min': 'Password must be at least 6 characters',
    'string.max': 'Password must be at most 15 characters',
    'any.required': 'Password is required',
  }),
});
