import { contactscollection } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getHomePageMessage = () => {
  return 'Welcome to the homepage';
};

export const getAllContacts = async ({
  page,
  perPage,
  sortBy,
  sortOrder,
  type,
  isFavourite,
  name,
  email,
  phoneNumber,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = contactscollection.find();

  if (type) {
    contactsQuery.where('contactType').equals(type);
  }
  if (isFavourite !== undefined) {
    contactsQuery.where('isFavourite').equals(isFavourite);
  }
  if (name) {
    contactsQuery.where('name', new RegExp(`^${name}`, 'i'));
  }
  if (email) {
    contactsQuery.where('email', new RegExp(`^${email}`, 'i'));
  }
  if (phoneNumber) {
    contactsQuery.where('phoneNumber', new RegExp(`^${phoneNumber}`));
  }

  const [contactsCount, contacts] = await Promise.all([
    contactscollection.countDocuments(contactsQuery.getFilter()),
    contactsQuery.skip(skip).limit(limit).sort(`${sortBy} ${sortOrder}`).exec(),
  ]);

  const paginateData = calculatePaginationData(contactsCount, page, perPage);

  return { data: contacts, ...paginateData };
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
