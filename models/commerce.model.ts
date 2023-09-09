import { model, Schema, Document } from 'mongoose';

export interface ICommerce extends Document {
    id: string;
    name: string,
    idCategory: [Schema.Types.ObjectId];
    idSubCategory: [Schema.Types.ObjectId];
    photos: IPhotos[];
    description: string;
    location: location;
    hasLocation: boolean;
    isDeleted: boolean;
    turnOn: boolean;
    logoUrl: IPhotos;
    messageForCustomers?: string;
    iLikeReceivedIds: [Schema.Types.ObjectId];
}

export interface IPhotos {
    name: string;
    idFirebase: string;
    imageUrl: string;
}

export interface location {
    type: string;
    coordinates: number[];
}

const commerceSchema = new Schema<ICommerce>({
    name: {
        type: String,
        required: true
    },
    idCategory: [{
        type: Schema.Types.ObjectId,
        ref: 'Categories',
    }],
    idSubCategory: [{
        type: Schema.Types.ObjectId,
        ref: 'subCategories',
    }],
    photos: [{
        name: String,
        idFirebase: String,
        imageUrl: String
    }],
    description: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            default: 'Point',
        },
        coordinates: [Number]
    },
    hasLocation: {
        type: Boolean,
        default: false
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    turnOn: {
        type: Boolean,
        default: true
    },
    logoUrl: {
        name: String,
        idFirebase: String,
        imageUrl: String
    },
    messageForCustomers: {
        type: String,
        default: ''
    },
    iLikeReceivedIds: [{
        type: Schema.Types.ObjectId,
        ref: 'Users',
    }]
})

commerceSchema.methods.toJSON = function () {
    const { __v, _id, isDeleted, ...commerce } = this.toObject();
    commerce.id = _id;
    return commerce;
}
export default model<ICommerce>("Commerces", commerceSchema)