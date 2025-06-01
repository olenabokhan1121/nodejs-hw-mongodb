import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import dotenv from 'dotenv';
import contactsRouter from './routers/contacts.js';
import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
dotenv.config();
export default function setupServer() {
  const app = express();
  /* app.use(express.json());*/
  app.use(pino({ transport: { target: 'pino-pretty' } }));
  app.use(cors());
  app.use(contactsRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);
  const PORT = Number(getEnvVar('PORT', '3000'));

  app.listen(PORT, (error) => {
    if (error) {
      throw error;
    }

    console.log(`Server is running on port ${PORT}`);
  });
}
