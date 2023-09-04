import e, { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import User from '../models/users.model'
import { generateJWTToken } from '../helpers/jwt.helper';
import Server from "../server/server";

export const loginWithEmailAndPassword = async (req: Request, res: Response) => {
    // const server = new Server();
    // try {


    //     await server.firebase.auth().signInWithEmailAndPassword(req.body.email, req.body.password)

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
    const photoURL = 'https://firebasestorage.googleapis.com/v0/b/ontaz-7a32a.appspot.com/o/assets-defaults%2Fno-user-photo.png?alt=media&token=d80f2792-fe4f-43ff-a140-0600ef0c5394'
    try {

        const codePhone = '+52'
        const { email, password, displayName, phoneNumber } = req.body;

        const existUser = await User.countDocuments({ email, status: true })

        if (existUser > 0) {
            return res.json({
                message: 'El correo ya se encuentra registrado, Inténtalo con otro correo',
                code: 'auth/email-already-exists',
            });
        }

        const user = new User({
            email: email,
            fullName: displayName,
            codeCountry: codePhone,
            phoneNumber: phoneNumber,
            photoURL: photoURL
        })

        const salt = bcryptjs.genSaltSync();

        user.password = bcryptjs.hashSync(password, salt);
        user.crypt.salt = salt;

        await user.save()

        return res.status(200).json({
            message: 'Registro exitoso',
            code: 'auth/account-created',
            data: user
        })

    } catch (error: any) {
        console.log(error)
        return res.status(500).json({
            message: 'Something went wrong',
        })
    }
}