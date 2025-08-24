import { Router } from 'express';

import * as s from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  contactsValidationSchemaCreate,
  contactsValidationSchemaUpdate,
} from '../validation/contactsValidationSchema.js';

const contactsRouter = Router();

contactsRouter.get('/', s.getContactsAllController);

contactsRouter.get('/:contactId', isValidId, s.getContactByIdController);

contactsRouter.post(
  '/',
  validateBody(contactsValidationSchemaCreate),
  s.createContactController,
);

contactsRouter.patch(
  '/:contactId',
  isValidId,
  validateBody(contactsValidationSchemaUpdate),
  s.patchContactController,
);

contactsRouter.delete('/:contactId', isValidId, s.deleteContactController);

export default contactsRouter;
