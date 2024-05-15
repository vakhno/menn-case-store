import express from 'express';
import { uploadPhoto } from '../controllers/photo.controller.js';
import { multerPhotoUpload } from '../utils/multerPhotoUploader.js';

const router = express.Router();

router.post('/upload', multerPhotoUpload, uploadPhoto);

export default router;
