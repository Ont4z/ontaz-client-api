import { Router } from 'express';
import { createUserWithEmailAndPassword, loginUserWithEmailAndPassword } from '../controllers/auth.controller';

const router = Router();

router.post('/v1/login', loginUserWithEmailAndPassword)
router.post('/v1/register', createUserWithEmailAndPassword)

export default router;