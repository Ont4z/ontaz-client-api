import { Router } from 'express';
import { getCategories } from '../controllers/category.controller';

const router = Router();

router.get('/v1/category', getCategories)


export default router;