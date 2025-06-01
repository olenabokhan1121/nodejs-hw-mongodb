import {
  getContactByIdController,
  getContactsController,
  deleteContactController,
  createContactController,
  patchContactController,
} from '../controllers/contacts.js';
import express from 'express';
import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
const router = Router();
const jsonParser = express.json();
router.get('/contacts', ctrlWrapper(getContactsController));
router.get('/contacts/:contactId', ctrlWrapper(getContactByIdController));
router.delete('/contacts/:contactId', ctrlWrapper(deleteContactController));
router.post('/contacts', jsonParser, ctrlWrapper(createContactController));
router.patch(
  '/contacts/:contactId',
  jsonParser,
  ctrlWrapper(patchContactController),
);
export default router;
