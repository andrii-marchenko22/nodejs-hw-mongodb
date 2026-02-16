import { Router } from 'express';

import * as s from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  contactsValidationSchemaCreate,
  contactsValidationSchemaUpdate,
} from '../validation/contactsValidationSchema.js';
import authenticate from '../middlewares/authenticate.js';
import { upload } from '../utils/multer.js';

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get('/', s.getContactsAllController);

contactsRouter.get('/:contactId', isValidId, s.getContactByIdController);

contactsRouter.post(
  '/',
  upload.single('photo'),
  validateBody(contactsValidationSchemaCreate),
  s.createContactController,
);

contactsRouter.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(contactsValidationSchemaUpdate),
  s.patchContactController,
);

contactsRouter.delete('/:contactId', isValidId, s.deleteContactController);

export default contactsRouter;
