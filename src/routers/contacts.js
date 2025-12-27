import { Router } from 'express';

import * as s from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  contactsValidationSchemaCreate,
  contactsValidationSchemaUpdate,
} from '../validation/contactsValidationSchema.js';

const contactsRouter = Router();

contactsRouter.get('/', s.homePageController);

contactsRouter.get('/contacts', s.getContactsAllController);

contactsRouter.get(
  '/contacts/:contactId',
  isValidId,
  s.getContactByIdController,
);

contactsRouter.post(
  '/contacts',
  validateBody(contactsValidationSchemaCreate),
  s.createContactController,
);

contactsRouter.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(contactsValidationSchemaUpdate),
  s.patchContactController,
);

contactsRouter.delete(
  '/contacts/:contactId',
  isValidId,
  s.deleteContactController,
);

export default contactsRouter;
