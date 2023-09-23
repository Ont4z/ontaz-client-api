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
                    logoUrl: item.logoUrl.imageUrl,
                    totalILike: item.iLikeReceivedIds.length
                }
            )))
        } else {
            const commerces = await commerce.find({ idCategory, isDeleted: false }).sort({ name: 1 });
            return res.json(commerces.map((item) => (
                {
                    id: item.id,
                    name: item.name,
                    logoUrl: item.logoUrl.imageUrl,
                    totalILike: item.iLikeReceivedIds.length
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


export const getCommerceById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const commerceFound = await commerce.findOne({ _id: id, isDeleted: false });
        if (!commerceFound) {
            return res.status(404).json({
                msg: 'Commerce not found'
            })
        }


        return res.json(commerceFound)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something went wrong'
        })
    }
}