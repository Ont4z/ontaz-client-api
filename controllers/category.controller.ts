import { Request, Response } from 'express'

import categoryModel from "../models/category.model";


export const getCategories = async (req: Request, res: Response) => {
    try {
        const { lang = "es" } = req.query;
        const categories = await categoryModel.find({ isDeleted: false }).sort({ name: 1 });
        res.json(categories.map((category: any) => {
            return {
                id: category.id,
                name: category.name[String(lang)],
                imageUrl: category.imageUrl
            }
        }))
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something went wrong'
        })
    }
}