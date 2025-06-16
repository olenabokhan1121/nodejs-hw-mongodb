import {
  getContactByIdController,
  getContactsController,
  deleteContactController,
  createContactController,
  patchContactController,
} from '../controllers/contacts.js';

import { Router } from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
const router = Router();

router.use(authenticate);
router.get('/', ctrlWrapper(getContactsController));
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));
router.post(
  '/',

  upload.single('photo'),
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);
router.patch(
  '/:contactId',

  upload.single('photo'),
  validateBody(updateContactSchema),
  isValidId,
  ctrlWrapper(patchContactController),
);
export default router;
