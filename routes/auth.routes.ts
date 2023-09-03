import { Router } from 'express';
import { createUserWithEmailAndPassword, loginWithEmailAndPassword } from '../controllers/auth.controller';

const router = Router();

router.post('/v1/login', loginWithEmailAndPassword)
router.post('/v1/register', createUserWithEmailAndPassword)

export default router;