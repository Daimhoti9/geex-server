const multer = require('multer');
const path = require('path');

// Configure multer storage and file naming
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory where files will be stored
    },
    
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix+"-_-"+ file.fieldname+path.extname(file.originalname)); // Unique filename
    }
});

// Create multer upload middleware function
const multerMiddleware = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        // Add file filtering logic if needed
        cb(null, true); // Accept all files for demonstration
    }
}).any(); // Accept any type of file (you can specify .single('fieldName') for single file upload)

module.exports = multerMiddleware;
