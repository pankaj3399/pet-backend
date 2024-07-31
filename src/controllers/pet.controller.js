import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Image } from "../models/image.model.js";
import { Pet } from "../models/pet.model.js";
import fs from 'fs';
import { removeLocalFile } from "../utils/helpers.js";

const addPet = asyncHandler(async (req, res) => {
    try {
        const { name, age, gender, temperament } = req.body;

        //Save image to mongodb database as a buffer
        const imageBuffer = fs.readFileSync(req.file.path);
        const imageData = {
            data: imageBuffer,
            contentType: req.file.mimetype,
            size: req.file.size,
            imageName: req.file.originalname
        };
        const insetedImage = await Image.create(imageData);
        removeLocalFile(req.file?.path);
        if (!insetedImage) {
            throw new ApiError(400, "Image not saved");
        }

        const petData = {
            name,
            age,
            gender,
            temperament,
            image: insetedImage._id
        }
        const insertedPet = await Pet.create(petData);
        if (!insertedPet) {
            throw new ApiError(400, "Pet not saved");
        }

        // return res
        return res
            .status(201)
            .json(new ApiResponse(201, insertedPet, "Pet added Successfully"));
    } catch (error) {
        throw new ApiError(error?.statusCode || 500, error?.message || "Something went wrong while adding the pet");
    }
});

const updatePet = asyncHandler(async (req, res) => {
    try {
        const { petId } = req.params;
        const { name, age, gender, temperament } = req.body;

        const pet = await Pet.findById(petId);
        if (!pet) {
            throw new ApiError(404, "Pet not found");
        }

        //If image changed then save new image data to mongodb database as a buffer
        if (req.file) {
            const petExistingImage = await Image.findById(pet.image);
            const imageBuffer = fs.readFileSync(req.file.path);
            petExistingImage.data = imageBuffer;
            petExistingImage.contentType = req.file.mimetype;
            petExistingImage.size = req.file.size;
            petExistingImage.imageName = req.file.originalname;
            const updatedImage = await petExistingImage.save();
            removeLocalFile(req.file?.path);
            if (!updatedImage) {
                throw new ApiError(400, "Image not updated");
            }
        }
        if (name) {
            pet.name = name;
        }
        if (age) {
            pet.age = age;
        }
        if (gender) {
            pet.gender = gender;
        }
        if (temperament) {
            pet.temperament = temperament;
        }

        const updatedPet = await pet.save();
        if (!updatedPet) {
            throw new ApiError(400, "Pet not updated");
        }

        // return res
        return res
            .status(200)
            .json(new ApiResponse(200, updatedPet, "Pet Updated Successfully"));
    } catch (error) {
        throw new ApiError(error?.statusCode || 500, error?.message || "Something went wrong while updating the pet");
    }
});

const removePet = asyncHandler(async (req, res) => {
    try {
        const { petId } = req.params;

        const pet = await Pet.findById(petId);
        if (!pet) {
            throw new ApiError(404, "Pet not found");
        }

        await Image.findByIdAndDelete(pet.image);
        const deletedPet = await Pet.findByIdAndDelete(petId);
        if (!deletedPet) {
            throw new ApiError(400, "Pet not deleted");
        }

        // return res
        return res
            .status(200)
            .json(new ApiResponse(200, "Pet removed Successfully"));
    } catch (error) {
        throw new ApiError(error?.statusCode || 500, error?.message || "Something went wrong while deleting the pet");
    }
});

const petDetails = asyncHandler(async (req, res) => {
    try {
        const { petId } = req.params;

        const pet = await Pet.findById(petId);
        if (!pet) {
            throw new ApiError(404, "Pet not found");
        }

        // return res
        return res
            .status(200)
            .json(new ApiResponse(200, pet, "Pet details fatched Successfully"));
    } catch (error) {
        throw new ApiError(error?.statusCode || 500, error?.message || "Something went wrong while fething pet details");
    }
});


export {
    addPet,
    updatePet,
    removePet,
    petDetails
}