import { Router } from 'express';
import { loginWithEmailAndPassword } from '../controllers/auth.controller';

const router = Router();

router.post('/v1/login', loginWithEmailAndPassword)




export default router;