import { contactscollection } from '../db/models/contact.js';

export const getHomePageMessage = () => {
  return 'Welcome to the homepage';
};

export const getAllContacts = async () => {
  const contacts = await contactscollection.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await contactscollection.findById(contactId);
  return contact;
};

export const createContact = async (payload) => {
  const contact = await contactscollection.create(payload);
  return contact;
};

export const updateContact = async (contactById, payload, options = {}) => {
  const result = await contactscollection.findByIdAndUpdate(
    { _id: contactById },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!result || !result.value) return null;

  return {
    contact: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async (contactById) => {
  const contact = await contactscollection.findByIdAndDelete(contactById);
  return contact;
};
