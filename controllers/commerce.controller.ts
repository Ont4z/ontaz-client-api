import { Request, Response } from 'express'

import commerce from '../models/commerce.model';

export const getCommercesByIdCategoryAndSubCategory = async (req: Request, res: Response) => {
    try {
        const { lang = "es", idCategory, idSubCategory } = req.query;

        if (idSubCategory !== 'all' && idSubCategory) {
            const commerces = await commerce.find({ idCategory, idSubCategory, isDeleted: false }).sort({ name: 1 });
            return res.json(commerces.map((item) => (
                {
                    id: item.id,
                    name: item.name,
                    logoUrl: item.logoUrl.imageUrl
                }
            )))
        } else {
            const commerces = await commerce.find({ idCategory, isDeleted: false }).sort({ name: 1 });
            return res.json(commerces.map((item) => (
                {
                    id: item.id,
                    name: item.name,
                    logoUrl: item.logoUrl.imageUrl
                }
            )))
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something went wrong'
        })
    }
}
