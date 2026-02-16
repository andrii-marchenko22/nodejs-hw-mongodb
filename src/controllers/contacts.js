import createHttpError from 'http-errors';
import * as s from '../services/contacts.js';
import { saveFile } from '../utils/saveFile.js';

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
    userId: req.user._id,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;

  const contact = await s.getContactById(contactId, req.user._id);

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
  if (!req.user || !req.user._id) {
    throw createHttpError(401, 'Unauthorized');
  }

  const photo = req.file;
  let photoUrl;
  const payload = { ...req.body, userId: req.user._id };

  if (photo) {
    photoUrl = await saveFile(photo);
    payload.photo = photoUrl;
  }

  const contact = await s.createContact(payload);

  res.status(201).json({
    status: 201,
    message: `Successfully created the contact!`,
    data: contact,
  });
};

export const patchContactController = async (req, res, next) => {
  const { contactId } = req.params;
  const photo = req.file;
  const payload = { ...req.body };
  let photoUrl;

  if (photo) {
    photoUrl = await saveFile(photo);
    payload.photo = photoUrl;
  }

  const updatedContact = await s.updateContact(
    contactId,
    payload,
    req.user._id,
  );

  if (!updatedContact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully patched a ${Object.keys(req.body).join(', ')}!`,
    data: updatedContact,
  });
};

export const deleteContactController = async (req, res, next) => {
  const { contactId } = req.params;

  const deleteCcontact = await s.deleteContact(contactId, req.user._id);

  if (!deleteCcontact) {
    next(createHttpError(404, 'Contact not found'));
    return;
  }

  res.status(204).send();
};
