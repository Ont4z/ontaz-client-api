import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/users.model'


export const validateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['x-token'] as string;

    if (!token) {
        return res.status(401).json({
            msg: 'There is no token in the request'
        })
    }

    try {

        const { uid }: any = jwt.verify(token, `${process.env.PRIVATE_KEY}`);
        const user = await User.findById(uid)

        if (!user) {
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            });
        }

        if (!user.status) {
            return res.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            });
        }

        next();

    } catch (error) {
        res.status(401).json({
            msg: 'Invalid token'
        })
    }
}
