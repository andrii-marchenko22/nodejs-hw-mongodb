import Joi from 'joi';

export const loginWithGoogleOAuthSchema = Joi.object({
  code: Joi.string().required().messages({
    'string.base': 'Code must be a string',
    'any.required': 'Authorization code is required',
    'string.empty': 'Authorization code cannot be empty',
  }),
});
