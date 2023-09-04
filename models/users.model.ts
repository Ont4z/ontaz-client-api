import { model, Schema, Document } from 'mongoose';

export interface IUser extends Document {
    id: string;
    email: string;
    fullName: string;
    phoneNumber: string;
    codeCountry: string;
    photoURL: string;
    status: boolean;
    password: string;
    location: {
        type: string;
        coordinates: number[];
    },
    settings: {
        minDistance: number;
        maxDistance: number;
        fcmToken: string;
    },
    crypt: {
        salt: string;
    }
    typeAccount: 'USER' | 'SELLER' | 'ADMIN',
    createdAt: Date;
}

const userSchema = new Schema<IUser>({
    email: String,
    password: {
        type: String,
        required: true,
    },
    fullName: String,
    status: {
        type: Boolean,
        default: true
    },
    photoURL: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    codeCountry: {
        type: String,
        default: '+52'
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
            required: false,
        },
        coordinates: {
            type: [Number],
            required: false,
            default: [0, 0]
        }
    },
    settings: {
        minDistance: {
            type: Number,
            default: 1
        },
        maxDistance: {
            type: Number,
            default: 20000
        },
        fcmToken: {
            type: String,
            default: ''
        },
    },
    typeAccount: {
        type: String,
        enum: ['USER', 'SELLER', 'ADMIN'],
        default: 'USER'
    },
    crypt: {
        salt: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

userSchema.methods.toJSON = function () {
    const { __v, _id, status, password, crypt, location, ...user } = this.toObject();
    user.id = _id;
    return user;
}
export default model<IUser>("User", userSchema)