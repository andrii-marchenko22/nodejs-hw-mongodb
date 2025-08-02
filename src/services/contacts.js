import { contactscollection } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const contacts = await contactscollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await contactscollection.findById(contactId);
  return contact;
};
