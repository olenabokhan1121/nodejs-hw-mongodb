import { Contact } from '../db/models/contacts.js';
export const getAllContacts = async ({ page, perPage, sortBy, sortOrder }) => {
  const skip = page > 0 ? (page - 1) * perPage : 0;
  const contactQuery = Contact.find(); //масив даних

  const [total, contacts] = await Promise.all([
    Contact.countDocuments(/*contactQuery*/),
    contactQuery
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(perPage),
  ]);
  // console.log({total, contacts});
  const totalPages = Math.ceil(total / perPage);

  return {
    data: contacts,
    page,
    perPage,
    totalItems: total,
    totalPages,
    hasPreviousPage: page > 1,
    hasNextPage: totalPages > page,
  };
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};
export const deleteContact = async (contactId) => {
  const contact = await Contact.findByIdAndDelete(contactId);
  return contact;
};
export const createContact = async (payload) => {
  const contact = await Contact.create(payload);
  return contact;
};
export const updateContact = async (contactId, payload) => {
  const rawResult = await Contact.findOneAndUpdate(
    { _id: contactId },
    payload,
    {
      new: true,
    },
  );
  return rawResult;
};
