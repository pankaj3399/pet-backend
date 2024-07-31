import multer from 'multer';
import fs from 'fs';
import path from 'path';

/**
* This function is used to sanitize the file before uploading it to the server.
* It checks the file extension and mime type.
* @param {Object} file - The file object
* @param {Function} cb - The callback function
*/
const sanitizeFile = (file, cb) => {
    // Define the allowed extension
    const fileExts = [".png", ".jpg", ".jpeg", ".gif"];

    // Check allowed extensions
    const isAllowedExt = fileExts.includes(
        path.extname(file.originalname.toLowerCase())
    );

    // Mime type must be an image
    const isAllowedMimeType = file.mimetype.startsWith("image/");

    if (isAllowedExt && isAllowedMimeType) {
        return cb(null, true); // no errors
    } else {
        /**
         * The `Error` constructor creates an error object. Instances of Error objects are thrown when runtime errors occur.
         * The `statusCode` property sets the status code of the error.
         * 
         * Here 415 statusCode is for Unsupported Media Type
         * 
         * The HTTP 415 Unsupported Media Type client error response code indicates that the server refuses 
         * to accept the request because the payload format is in an unsupported format.
         */
        const error = new Error("Error: File type not allowed!");
        error.statusCode = 415;
        cb(error);
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        /*
            The `fs.existsSync()` method is used to synchronously test whether or not the given path exists.
            If path not found, it will create the path.
        */
        if (!fs.existsSync("./public/temp")) {
            fs.mkdirSync("./public/temp", { recursive: true });
        }

        // This storage needs public/temp folder in the root directory
        // Else it will throw an error saying cannot find path public/temp
        cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        sanitizeFile(file, cb);
    },
    limits: {
        fileSize: 1024 * 1024 * 5, // 5 MB
    },
});