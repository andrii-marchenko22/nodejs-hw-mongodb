import { Router } from 'express';
import * as s from '../controllers/auth.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  loginValidationSchema,
  registerValidationSchema,
} from '../validation/userValidationSchema.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(registerValidationSchema),
  s.registerUserController,
);

authRouter.post(
  '/login',
  validateBody(loginValidationSchema),
  s.loginUserController,
);

authRouter.post('/refresh', s.refreshUserSessionController);

authRouter.post('/logout', s.logoutUserController);

export default authRouter;
