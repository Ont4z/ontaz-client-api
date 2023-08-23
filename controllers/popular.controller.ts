import { Request, Response } from 'express';


export const getPopular = async (req: Request, res: Response) => {
    // try {
    //     const { lang = "es" } = req.query;
    //     const popular = await popularModel.find({ isDeleted: false }).sort({ name: 1 });
    //     res.json(popular.map((popular: any) => {
    //         return {
    //             id: popular.id,
    //             name: popular.name[String(lang)],
    //             imageUrl: popular.imageUrl
    //         }
    //     }))
    // } catch (error) {
    //     console.log(error)
    //     res.status(500).json({
    //         msg: 'Something went wrong'
    //     })
    // }
}