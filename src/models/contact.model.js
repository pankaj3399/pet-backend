import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        default: null,
    }
}, { timestamps: true });

export const Contact = mongoose.model("contact", contactSchema);