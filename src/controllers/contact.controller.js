import { asyncHandler } from "../utils/asyncHandler.js";
import { Contact } from "../models/contact.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const contactForm = asyncHandler(async (req, res) => {
    try {
        const { firstName, lastName, email, message } = req.body;

        const contactForm = {
            firstName,
            lastName,
            email,
            message
        }
        if (req.user) {
            contactForm.user = req.user?._id;
        }
        console.log(req.user);
        console.log(contactForm);
        const submittedForm = await Contact.create(contactForm);
        if (!submittedForm) {
            throw new ApiError(400, "Failed to submit contact form");
        }

        // return res
        return res
            .status(200)
            .json(new ApiResponse(200, "Contact form submitted successfully"));
    } catch (error) {
        throw new ApiError(error?.statusCode || 500, error?.message || "Something went wrong while submitting contact form");
    }
});

export {
    contactForm
}