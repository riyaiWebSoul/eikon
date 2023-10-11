const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const server = express();
const fs = require('fs');

const HomeRouter = require('./routes/home');
const productRouter = require('./routes/product');
const userRouter = require('./routes/user');
const AboutRouter = require('./routes/about');
const AppointmentRouter = require('./routes/appointment');
const MedicalRouter = require('./routes/medical');
const MapingEcommerceRouter = require('./routes/MapingEcommerce');
const FooterRouter = require('./routes/footer');
const EnquiryRouter = require('./routes/enquiry');
const HealingTouch = require('./routes/healingTouch');
const PatientReview = require('./routes/PatientReview');
const DrList = require('./routes/drList');
const LoginIdRouter = require('./routes/loginId');
const ImageUploadRouter = require('./routes/imagesUpload');
const PORT = process.env.PORT || 8080;
const MONGODB_URI = process.env.MONGODB_URI; // Set this environment variable

// Connect to the MongoDB database
mongoose.connect('mongodb+srv://iwebsoul:ZkK7vXCmICDXqsM6@cluster0.meodf1o.mongodb.net/eikon', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err);
  });

// Middleware to parse JSON request bodies
server.use(express.json());
server.use(morgan('default'));

// Serve static files from the 'public' directory
server.use(express.static('public'));

// CORS setup
server.use(cors({
  origin: ["http://eikon-server.vercel.app"], // Add your actual frontend domain(s)
  methods: ["POST", "GET"],
  credentials: true,
}));

// Define your routes using async functions
server.use('/imageUploads', express.static('public/images'));
server.use('/products', productRouter.router);
server.use('/user', userRouter.router);
server.use('/about', AboutRouter.router);
server.use('/home', HomeRouter.router);
server.use('/appointments', AppointmentRouter.router);
server.use('/medical', MedicalRouter.router);
server.use('/MapingEcommerce', MapingEcommerceRouter.router);
server.use('/footer', FooterRouter.router);
server.use('/enquiry', EnquiryRouter.router);
server.use('/healingTouch', HealingTouch.router);
server.use('/PatientReview', PatientReview.router);
server.use('/drList', DrList.router);
server.use('/imageUpload', ImageUploadRouter.router);
server.use('/loginId', LoginIdRouter.router);
server.use('/images', express.static('public/images'));

// Add a route to fetch data from MongoDB
server.get('/api/data', async (req, res) => {
  try {
    const collection = mongoose.connection.db.collection('eikon'); // Replace with your collection name

    // Query MongoDB to retrieve data (modify this query as needed)
    const data = await collection.find({}).toArray();

    // Send the retrieved data as a JSON response
    res.json({ data });
  } catch (err) {
    console.error('Error fetching data from MongoDB:', err);
    res.status(500).json({ error: 'Error fetching data from MongoDB' });
  }
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'public', 'images'));
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const fileName = `${timestamp}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage });

// Route to upload an image
server.post('/imageUpload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Get the image name from the uploaded file's filename
  const imageName = req.file.filename;

  // You can send back the uploaded image URL as a response
  res.json({ imageUrl: `/imageUploads/${imageName}` });
});

// Route to list uploaded images
server.get('/listImages', (req, res) => {
  const imageDir = path.join(__dirname, 'public', 'images');

  fs.readdir(imageDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading images directory' });
    }

    const imageFiles = files.filter((file) => {
      const extname = path.extname(file);
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(extname.toLowerCase());
    });

    const imageUrls = imageFiles.map((file) => `/imageUploads/${file}`);

    res.json({ images: imageUrls });
  });
});

// Route to delete an image
server.delete('/deleteImage/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, 'public', 'images', filename);

  fs.unlink(imagePath, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error deleting image' });
    }

    res.json({ message: 'Image deleted successfully' });
  });
});

// Start the server on the specified port
server.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
