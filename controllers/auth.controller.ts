import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import User from '../models/users.model'
import { sendNotificationFCM } from '../helpers/fcmFirebase';
// import { generateJWTToken } from '../helpers/jwt.helper';
// import Server from "../server/server";


export const loginUserWithEmailAndPassword = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        //verificar si el email existe
        const usuario = await User.findOne({ email });
        if (!usuario) {
            return res.status(404).json({
                message: 'usuario o password no son correctos',
                code: 'auth/account-not-found',
            })
        }

        //verificar si el usuario esta activo
        if (!usuario.status) {
            return res.status(400).json({
                message: 'usuario inactivo',
                code: 'auth/account-inactive',
            })
        }
        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                message: 'usuario o password no son correctos',
                code: 'auth/account-invalid-password',
            })
        }
        //generar JWT
        //const token = await generarJWT( usuario.id );
        return res.status(200).json({
            message: 'login exitoso',
            code: 'auth/login-success',
            data: usuario
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
        })
    }
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
        return res.status(500).json({
            message: 'Something went wrong',
        })
    }
}


export const addOrUpdateTokenFCMUser = async (req: Request, res: Response) => {
    const { fcmToken, id } = req.body;
    try {
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(404).json({
                message: 'Usuario no encontrado',
                code: 'auth/user-not-found',
            })
        }

        user.settings.fcmToken = fcmToken;
        await user.save()

        await sendNotificationFCM({
            body: 'Bienvenido a Ontaz',
            idsFCM: [fcmToken]
        })

        return res.status(200).json({
            message: 'Registro exitoso',
            code: 'auth/token-saved-or-updated'
        })
    } catch (error) {
        return res.status(500).json({
            message: 'Something went wrong',
        })
    }
}