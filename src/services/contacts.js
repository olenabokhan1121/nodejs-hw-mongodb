import { Contact } from '../db/models/contacts.js';
export const getAllContacts = async () => {
  const contacts = await Contact.find();
  return contacts;
};

export const getContacById = async (contactId) => {
  const contact = await Contact.findById(contactId);
  return contact;
};
