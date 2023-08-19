import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import User from '../models/users.model'
import { generateJWTToken } from '../helpers/jwt.helper';
import Server from "../server/server";

export const loginWithEmailAndPassword = async (req: Request, res: Response) => {
    const server = new Server();
    try {
        const { uid, email, displayName } = await server.firebase.auth().createUser({
            email: 'ivan.perez.chan@hotmail.com',
            emailVerified: false,
            phoneNumber: '+16505550103',
            password: '123456789',
            displayName: 'test from node api',
            photoURL: 'https://lh3.googleusercontent.com/ogw/AGvuzYYwwZDdRe1b6DyzfV_ZAyBP6RdwX4nsV1EPyMVNiw=s32-c-mo',
        })

        console.log({
            uid, email, displayName
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong',
        })
    }

    const { email, password } = req.body;
    const user = await User.findOne({ email: email })

    if (!user) {
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos'
        })
    }

    if (!user.status) {
        return res.status(400).json({
            msg: 'Usuario Inactivo'
        })
    }

    const validatePassword = bcryptjs.compareSync(password, user.password);

    if (!validatePassword) {
        return res.status(400).json({
            msg: 'Usuario / Password no son correctos'
        })
    }

    const token = await generateJWTToken({
        uid: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName
    });

    res.json({
        user,
        token,
        msg: 'Login Success'
    })
}