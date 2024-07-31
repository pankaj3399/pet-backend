import mongoose, { Schema } from "mongoose";

const petSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: Schema.Types.ObjectId,
        ref: "Image",
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        trim: true,
    },
    temperament: {
        type: String,
        required: true,
        trim: true,
    }
}, { timestamps: true });

export const Pet = mongoose.model("Pet", petSchema);