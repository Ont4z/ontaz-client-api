import { Request, Response } from 'express'


import subCategoryModel from '../models/subCategory.model';

export const getSubCategoriesByIdCategory = async (req: Request, res: Response) => {
    try {
        const { lang = "es", idCategory } = req.query;

        const All = {
            id: 'all',
            name: {
                es: 'Todos',
                en: 'All',
                fr: 'Tous'
            },
            idCategory: 'all',
            isDeleted: false
        }

        const subcategories = await subCategoryModel.find({ idCategory, isDeleted: false }).sort({ name: 1 });
        const subcategoriesWithAll = [All, ...subcategories]
        res.json(subcategoriesWithAll.map((subcategory: any) => {
            return {
                id: subcategory.id,
                name: subcategory.name[String(lang)],
                idCategory: subcategory.idCategory
            }
        }))
    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something went wrong'
        })
    }
}
