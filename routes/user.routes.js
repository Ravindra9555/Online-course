
import { Router } from 'express';
import { register, login, logout, refresh, getUserProfile } from "../controller/user.controller.js";
import upload from '../utils/multer.js';
const router = Router();

router.post('/register',upload.single('file') ,register);
router.post('/login', login);
router.get('/profile', getUserProfile);
router.post('/logout', logout);
router.post('/refresh', refresh); 

export default router;
