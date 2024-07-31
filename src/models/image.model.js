import mongoose, { Schema } from "mongoose";

const imageSchema = new Schema({
    data: Buffer,
    contentType: String,
    size: Number,
    imageName: String
}, { timestamps: true });

export const Image = mongoose.model("Image", imageSchema);