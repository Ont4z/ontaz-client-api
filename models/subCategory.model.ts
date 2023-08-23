import { model, Schema, Document } from 'mongoose';

export interface ISubCategory extends Document {
    id: string;
    name: {
        es: string;
        en: string;
        fr: string;
    },
    idCategory: Schema.Types.ObjectId;
    isDeleted: boolean;
}

export interface ISubCategoryResponse {
    id: string;
    name: string
}



const subCategorySchema = new Schema<ISubCategory>({
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
    idCategory: {
        type: Schema.Types.ObjectId,
        ref: 'Categories',
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

subCategorySchema.methods.toJSON = function () {
    const { __v, _id, isDeleted, ...subCategory } = this.toObject();
    subCategory.id = _id;
    return subCategory;
}
export default model<ISubCategory>("subCategories", subCategorySchema)