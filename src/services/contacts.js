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
  userId,
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = contactscollection.find({ userId });

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
    contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
      .exec(),
  ]);

  const paginateData = calculatePaginationData(contactsCount, page, perPage);

  return { data: contacts, ...paginateData };
};

export const getContactById = async (contactId, userId) => {
  const contact = await contactscollection.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = async (payload) => {
  const contact = await contactscollection.create(payload);
  return contact;
};

export const updateContact = async (
  contactById,
  payload,
  userId,
  options = {},
) => {
  const result = await contactscollection.findOneAndUpdate(
    { _id: contactById, userId },
    payload,
    { new: true, ...options },
  );

  return result;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await contactscollection.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};
