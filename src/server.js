import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import { getAllContacts, getContacById } from './services/contacts.js';
import { getEnvVar } from './utils/getEnvVar.js';
dotenv.config();
export default function setupServer() {
  const app = express();
  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(cors());
  app.get('/contacts', async (req, res) => {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      data: contacts,
      message: 'Successfully found contacts!',
    });
  });
  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    const contact = await getContacById(contactId);
    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }
    res.status(200).json({
      status: 200,
      data: contact,
      message: 'Successfully found contact with id {contactId}!',
    });
  });
  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
      message: 'Something went wrong',
    });
  });
  const PORT = Number(getEnvVar('PORT', '3000'));

  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Server is running on port ${PORT}`);
  });
}
