import { Router } from 'express';

import {
  createContactController,
  deleteContactController,
  getContactByIdController,
  getContactsAllController,
  homePageController,
  patchContactController,
} from '../controllers/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', homePageController);

contactsRouter.get('/contacts', getContactsAllController);

contactsRouter.get('/contacts/:contactId', getContactByIdController);

contactsRouter.post('/contacts', createContactController);

contactsRouter.patch('/contacts/:contactId', patchContactController);

contactsRouter.delete('/contacts/:contactId', deleteContactController);

export default contactsRouter;
