const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express()
const multer = require("multer");
const cors = require("cors");
const path = require("path");
app.use("/assets", express.static(path.join(__dirname, "public/assets")));
app.use('/public', express.static(path.join(__dirname, 'public/CVs')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(bodyParser.json())


const dotenv = require("dotenv");

dotenv.config();

const agentRoutes = require('./Routes/Agent');
app.use('/agent', agentRoutes);
const recruiterRoutes = require('./Routes/Recruiter');
app.use('/recruiter', recruiterRoutes);
const jobRoutes = require('./Routes/Job');
app.use('/job', jobRoutes);
const userRoutes = require('./Routes/User');
app.use('/user', userRoutes);
const invoiceRoutes = require('./Routes/Invoice');
app.use('/invoice', invoiceRoutes);
const appointmentRoutes = require('./Routes/Appointment');
app.use('/appointment', appointmentRoutes);

const notificationRoutes = require('./Routes/Notification')
app.use('/notification', notificationRoutes);



// Route to download CV file
app.get('/download-cv/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'public/CVs', filename);
  console.log(filename)
  if (fs.existsSync(filePath)) {
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    res.setHeader('Content-Type', 'application/pdf'); // Adjust content type based on file type
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    res.status(404).send('File not found');
  }
});


app.get('/download-recruiter-doc/:filename', (req, res) => {
  const { filename } = req.params;
  const filePath = path.join(__dirname, 'uploads', filename);

  if (fs.existsSync(filePath)) {
    // Determine file extension
    const fileExtension = path.extname(filename).toLowerCase();

    // Set appropriate Content-Type based on file extension
    let contentType = '';
    switch (fileExtension) {
      case '.pdf':
        contentType = 'application/pdf';
        break;
      case '.doc':
        contentType = 'application/msword';
        break;
      case '.docx':
        contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      case '.jpg':
      case '.jpeg':
        contentType = 'image/jpeg';
        break;
      case '.png':
        contentType = 'image/png';
        break;
      default:
        // Default to application/octet-stream if content type is unknown
        contentType = 'application/octet-stream';
    }

    // Set response headers
    res.setHeader('Content-Disposition', `attachment; filename=${filename.split("-_-")[1]}`);
    res.setHeader('Content-Type', contentType);

    // Stream file to response
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  } else {
    res.status(404).send('File not found');
  }
});


const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`App Listening at Port ${port}`)
})

const DB = "mongodb+srv://i200773:geex1234@cluster0.wtkesmx.mongodb.net/retryWrites=true&w=majority"
mongoose.connect(DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Database connected"))
  .catch((error) => console.log(error.message));