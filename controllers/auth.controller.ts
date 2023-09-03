import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import User from '../models/users.model'
import { generateJWTToken } from '../helpers/jwt.helper';
import Server from "../server/server";

export const loginWithEmailAndPassword = async (req: Request, res: Response) => {
    // const server = new Server();
    // try {
    //     const { uid, email, displayName } = await server.firebase.auth().createUser({
    //         email: 'ivan.perez.chan@hotmail.com',
    //         emailVerified: false,
    //         phoneNumber: '+16505550103',
    //         password: '123456789',
    //         displayName: 'test from node api',
    //         photoURL: 'https://lh3.googleusercontent.com/ogw/AGvuzYYwwZDdRe1b6DyzfV_ZAyBP6RdwX4nsV1EPyMVNiw=s32-c-mo',
    //     })

    //     console.log({
    //         uid, email, displayName
    //     })

    // } catch (error) {
    //     console.log(error)
    //     return res.status(500).json({
    //         message: 'Something went wrong',
    //     })
    // }

    // const { email, password } = req.body;
    // const user = await User.findOne({ email: email })

    // if (!user) {
    //     return res.status(400).json({
    //         msg: 'Usuario / Password no son correctos'
    //     })
    // }

    // if (!user.status) {
    //     return res.status(400).json({
    //         msg: 'Usuario Inactivo'
    //     })
    // }

    // const validatePassword = bcryptjs.compareSync(password, user.password);

    // if (!validatePassword) {
    //     return res.status(400).json({
    //         msg: 'Usuario / Password no son correctos'
    //     })
    // }

    // const token = await generateJWTToken({
    //     uid: user._id,
    //     email: user.email,
    //     firstName: user.firstName,
    //     lastName: user.lastName
    // });

    // res.json({
    //     user,
    //     token,
    //     msg: 'Login Success'
    // })
}


export const createUserWithEmailAndPassword = async (req: Request, res: Response) => {

    try {
        const server = new Server();
        const codePhone = '+52'
        const { email, password, fullName, phoneNumber } = req.body;

        const { uid, photoURL } = await server.firebase.auth().createUser({
            email: email,
            emailVerified: false,
            phoneNumber: codePhone + phoneNumber,
            password: password,
            displayName: fullName,
            photoURL: 'https://firebasestorage.googleapis.com/v0/b/ontaz-7a32a.appspot.com/o/assets-defaults%2Fno-user-photo.png?alt=media&token=d80f2792-fe4f-43ff-a140-0600ef0c5394',
        })

        const user = new User({
            email: email,
            fullName: fullName,
            phoneNumber: phoneNumber,
            firebaseId: uid,
            photoURL: photoURL
        })

        await user.save()

        return res.status(200).json({
            message: 'Registro exitoso',
            code: 'auth/account-created',
            data: {
                id: user._id,
                firebaseId: uid,
                email,
                fullName,
                phoneNumber,
                photoURL: photoURL,
            }
        })

    } catch (error: any) {

        if (error.code === 'auth/email-already-exists') {
            return res.status(500).json({
                message: `El correo ya se encuentra registrado, Inténtalo con otro correo`,
                code: error.code
            })
        }

        if (error.code === 'auth/phone-number-already-exists') {
            return res.status(500).json({
                message: `El Numero de Teléfono ya se encuentra registrado, Inténtalo con otro numero`,
                code: error.code
            })
        }

        return res.status(500).json({
            message: 'Something went wrong',
        })
    }
}