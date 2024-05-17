import express from 'express';
import { uploadPhoto, isPhotoExist } from '../controllers/photo.controller.js';
import { multerPhotoUpload } from '../utils/multerPhotoUploader.js';

const router = express.Router();

router.post('/upload', multerPhotoUpload, uploadPhoto);
router.post('/is-photo-exist', isPhotoExist);

export default router;
