import { body, param } from "express-validator";

const addPetValidator = () => {
    return [
        body('name')
            .trim()
            .notEmpty()
            .withMessage('Name is required'),
        body('image')
            .custom((value, { req }) => {
                if (!req.file) {
                    throw new Error('Image file is required');
                }
                return true;
            }),
        body('age')
            .isInt({ min: 0 })
            .withMessage('Age must be a positive integer'),
        body('gender')
            .trim()
            .notEmpty()
            .withMessage('Gender is required'),
        body('temperament')
            .trim()
            .notEmpty()
            .withMessage('Temperament is required')
    ];
};

const updatePetValidator = () => {
    return [
        param('petId')
            .isMongoId()
            .withMessage('Invalid pet id'),
        body('name')
            .optional()
            .trim(),
        body('age')
            .isInt({ min: 0 })
            .withMessage('Age must be a positive integer'),
        body('gender')
            .optional()
            .trim(),
        body('temperament')
            .optional()
            .trim()
    ]
};

const deletePetValidator = () => {
    return [
        param('petId')
            .isMongoId()
            .withMessage('Invalid pet id')
    ];
};


export {
    addPetValidator,
    updatePetValidator,
    deletePetValidator
};
