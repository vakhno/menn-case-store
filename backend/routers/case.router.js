import express from 'express';
import { createCase } from '../controllers/case.controller.js';
const router = express.Router();

router.post('/create', createCase);

export default router;
