import { Router } from 'express';
import { addOrUpdateTokenFCMUser, createUserWithEmailAndPassword, loginUserWithEmailAndPassword } from '../controllers/auth.controller';

const router = Router();

router.post('/v1/login', loginUserWithEmailAndPassword)
router.post('/v1/register', createUserWithEmailAndPassword)
router.post('/v1/fcmToken', addOrUpdateTokenFCMUser)

export default router;