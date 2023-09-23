import { Router } from 'express';
import { getCommerceById, getCommercesByIdCategoryAndSubCategory } from '../controllers/commerce.controller';

const router = Router();

router.get('/v1/commerce', getCommercesByIdCategoryAndSubCategory)
router.get('/v1/commerce/:id', getCommerceById)

export default router;