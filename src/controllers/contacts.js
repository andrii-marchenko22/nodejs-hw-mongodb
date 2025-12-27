import createHttpError from 'http-errors';
import * as s from '../services/contacts.js';

export const homePageController = async (req, res) => {
  const message = s.getHomePageMessage();
  res.send(message);
};

export const getContactsAllController = async (req, res) => {
  const {
    page,
    perPage,
    sortBy,
    sortOrder,
    type,
    isFavourite,
    name,
    email,
    phoneNumber,
  } = req.query;
  const contacts = await s.getAllContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    type,
    isFavourite,
    name,
    email,
    phoneNumber,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const contact = await s.getContactById(contactId);

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

export const createContactController = async (req, res) => {
  const contact = await s.createContact(req.body);

  res.status(201).json({
    status: 201,
    message: `Successfully created the contact!`,
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const isResult = await s.updateContact(contactId, req.body);

  if (!isResult) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched a ${Object.keys(req.body).join(', ')}!`,
    data: isResult.contact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const deleteCcontact = await s.deleteContact(contactId);

  if (!deleteCcontact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
