import { Request, Response } from 'express'

import categoryModel from "../models/category.model";
import commerceModel from '../models/commerce.model';
import mongoose from 'mongoose';

export const getCategories = async (req: Request, res: Response) => {
    try {

        const { latitude, longitude, lang = "es" } = req.query
        const latitudeParsed = parseFloat(latitude as string)
        const longitudeParsed = parseFloat(longitude as string)

        const commerces = await commerceModel.find({
            isDeleted: false,
            "location":
            {
                $near: {
                    $geometry: { type: "Point", coordinates: [longitudeParsed, latitudeParsed] }, $maxDistance: 12000
                }
            }
        });

        const categoriesInUse = commerces.map((serviceItem) => serviceItem.idCategory)
        const categoriesIds = categoriesInUse.flat()
        const uniqueCategoriesIds = [...new Set(categoriesIds.map((categoryId) => categoryId.toString()))]


        const categories = await categoryModel.find({
            _id: { $in: uniqueCategoriesIds.map((categoryId) => new mongoose.Types.ObjectId(categoryId)) }
        })

        res.json(categories?.map((category: any) => {
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
