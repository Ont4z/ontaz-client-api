import { Router } from 'express';
import { getSubCategoriesByIdCategory } from '../controllers/subCategory.controller';

const router = Router();

router.get('/v1/subCategory', getSubCategoriesByIdCategory)

export default router;