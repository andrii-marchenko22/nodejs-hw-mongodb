import Joi from 'joi';
import { isValidObjectId } from 'mongoose';

export const contactsValidationSchemaCreate = Joi.object({
  name: Joi.string().trim().min(3).max(20).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name can be maximum 20 characters long',
    'any.required': 'Name must be required',
  }),
  phoneNumber: Joi.string()
    .trim()
    .pattern(/^\+?\d{6,15}$/)
    .required()
    .messages({
      'string.pattern.base':
        'Phone number must contain only digits and be 6 to 15 characters long',
      'string.empty': 'Phone number is required',
      'any.required': 'Phone number is required',
    }),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .lowercase()
    .required()
    .messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be a valid email address',
      'string.empty': 'Email is required',
      'any.required': 'Email is required',
    }),
  isFavourite: Joi.boolean().valid(true, false).default(false).messages({
    'boolean.base': 'isFavourite must be true or false',
    'any.only': 'Valid values are true or false',
    'any.required': 'isFavourite is required',
  }),
  contactType: Joi.string()
    .valid('work', 'home', 'personal')
    .required()
    .messages({
      'string.base': 'contactType must be a string',
      'any.only': 'contactType must be one of [work, home, personal]',
      'any.required': 'contactType is required',
    }),
  userId: Joi.string().custom((value, helper) => {
    if (value && !isValidObjectId(value)) {
      return helper.message('User id should be a valid mongo id');
    }
    return value;
  }),
});

export const contactsValidationSchemaUpdate = Joi.object({
  name: Joi.string().trim().min(3).max(20).messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name can be maximum 20 characters long',
  }),
  phoneNumber: Joi.string()
    .trim()
    .pattern(/^\+?\d{6,15}$/)
    .messages({
      'string.pattern.base':
        'Phone number must contain only digits and be 6 to 15 characters long',
      'string.empty': 'Phone number is required',
    }),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .lowercase()
    .messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be a valid email address',
      'string.empty': 'Email is required',
    }),
  isFavourite: Joi.boolean().valid(true, false).default(false).messages({
    'boolean.base': 'isFavourite must be true or false',
    'any.only': 'Valid values are true or false',
  }),
  contactType: Joi.string().valid('work', 'home', 'personal').messages({
    'string.base': 'contactType must be a string',
    'any.only': 'contactType must be one of [work, home, personal]',
  }),
});
