const multer = require('multer');
const path = require('path');

// Configure multer storage and file naming
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/Invoices'); // Specify the directory where files will be stored
    },
    filename: function (req, file, cb) {
        const originalName = file.originalname; // Get the original filename
        const ext = path.extname(originalName); // Get the file extension
        const uniqueSuffix = Date.now(); // Generate a timestamp to ensure uniqueness
        const fileName = `${originalName}`; // Construct unique filename
        cb(null, fileName);
    }
});

// Create multer upload middleware function for single file upload
const multerMiddleware = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Add file filtering logic if needed
        cb(null, true); // Accept all files for demonstration
    }
}).single('filePDFF'); // Specify the field name of the file input in the frontend form

module.exports = multerMiddleware;
