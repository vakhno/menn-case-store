import { SignIn, SignUp, Google, GoogleCallback, Logout } from '../controllers/auth.controller.js';
import express from 'express';

const router = express.Router();

router.post('/login', SignIn);
router.get('/google', Google);
router.get('/google/callback', GoogleCallback);
router.post('/signup', SignUp);
router.get('/logout', Logout);

export default router;
