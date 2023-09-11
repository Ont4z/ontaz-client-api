import { Router } from 'express';
import { getCommercesByIdCategoryAndSubCategory } from '../controllers/commerce.controller';

const router = Router();

router.get('/v1/commerce', getCommercesByIdCategoryAndSubCategory)


export default router;