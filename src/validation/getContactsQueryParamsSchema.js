import Joi from 'joi';

export const getContactsQueryParamsSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    'number.base': 'Page must be a number',
    'number.integer': 'Page must be an integer',
    'number.min': 'Page must be at least 1',
  }),
  perPage: Joi.number().integer().min(1).max(50).default(10).messages({
    'number.base': 'PerPage must be a number',
    'number.integer': 'PerPage must be an integer',
    'number.min': 'PerPage mmust be at least 1',
    'number.max': 'PerPage mmust be at most 50',
  }),
  sortBy: Joi.string()
    .valid('_id', 'name', 'phoneNumber', 'email', 'isFavourite', 'contactType')
    .default('_id')
    .messages({
      'string.base': 'SortBy must be a string',
      'any.only':
        'SortBy must be one of [_id, name, phoneNumber, email, isFavourite, contactType]',
    }),
  sortOrder: Joi.string().valid('asc', 'desc').default('asc').messages({
    'string.base': 'sortOrder must be a string',
    'any.only': 'SortOrder must be either asc or desc',
  }),
  type: Joi.string().valid('work', 'home', 'personal').messages({
    'string.base': 'Type must be a string',
    'any.only': 'Type must be one of [work, home, personal]',
  }),
  isFavourite: Joi.boolean().messages({
    'boolean.base': 'isFavourite must be true or false',
  }),
  name: Joi.string().trim().min(3).max(20).messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters',
    'string.max': 'Name can be at most 50 characters',
  }),
  email: Joi.string()
    .trim()
    .email({ tlds: { allow: false } })
    .messages({
      'string.base': 'Email must be a string',
      'string.email': 'Email must be a valid email address',
    }),
  phoneNumber: Joi.string()
    .trim()
    .pattern(/^\d{6,15}$/)
    .messages({
      'string.base': 'Phone number must be a string',
      'string.pattern.base':
        'Phone number must contain only digits and be 6 to 15 characters long',
    }),
});
