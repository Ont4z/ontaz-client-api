import { model, Schema, Document } from 'mongoose';

export interface ICategory extends Document {
    id: string;
    name: {
        es: string;
        en: string;
        fr: string;
    },
    imageUrl: string;
    isDeleted: boolean;
}

export interface ICategoryResponse {
    id: string;
    name: string,
    imageUrl: string;
}



const categorySchema = new Schema<ICategory>({
    name: {
        es: {
            type: String,
            required: true
        },
        en: {
            type: String,
            required: true
        },
        fr: {
            type: String,
            required: true
        },
    },
    imageUrl: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

categorySchema.methods.toJSON = function () {
    const { __v, _id, isDeleted, ...category } = this.toObject();
    category.id = _id;
    return category;
}
export default model<ICategory>("Category", categorySchema)