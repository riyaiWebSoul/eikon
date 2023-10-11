const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
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

const server = express();
const PORT = process.env.PORT || 8080;

// Connect to the MongoDB database
async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://localhost/your-database-name', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
  } catch (err) {
    console.error('Error connecting to the database:', err);
  }
}

// Middleware to parse JSON request bodies
server.use(express.json());
server.use(morgan('dev'));

// Serve static files from the 'public' directory
server.use(express.static('public'));

// CORS configuration
server.use(cors({
  origin: ['https://deploy-mean-1whq.vercel.app'],
  methods: ['POST', 'GET'],
  credentials: true,
}));

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Multer storage configuration for image uploads
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

// Define your routes using async functions
async function setupRoutes() {
  server.use('/imageUploads', express.static('public/images'));
  server.use('/products', productRouter);
  server.use('/user', userRouter);
  server.use('/about', AboutRouter);
  server.use('/home', HomeRouter);
  server.use('/appointments', AppointmentRouter);
  server.use('/medical', MedicalRouter);
  server.use('/MapingEcommerce', MapingEcommerceRouter);
  server.use('/footer', FooterRouter);
  server.use('/enquiry', EnquiryRouter);
  server.use('/healingTouch', HealingTouch);
  server.use('/PatientReview', PatientReview);
  server.use('/drList', DrList);
  server.use('/imageUpload', ImageUploadRouter);
  server.use('/loginId', LoginIdRouter);
  server.use('/images', express.static('public/images'));

  // Add a route to fetch data from MongoDB
  server.get('/data', async (req, res) => {
    try {
      const db = await connectToDatabase(); // Connect to the database
      const collection = db.collection('eikon'); // Replace with your collection name

      // Query MongoDB to retrieve data (modify this query as needed)
      const data = await collection.find({}).toArray();

      // Send the retrieved data as a JSON response
      res.json({ data });
    } catch (err) {
      console.error('Error fetching data from MongoDB:', err);
      res.status(500).json({ error: 'Error fetching data from MongoDB' });
    }
  });
}

// Image URLs array
const imageUrls = [];

// Route to list image files
server.get('/listImages', (req, res) => {
  const imageDir = path.join(__dirname, 'public', 'images');

  // Use the 'fs' module to read the contents of the directory
  fs.readdir(imageDir, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error reading images directory' });
    }

    // Filter out only image files (you can adjust this filter as needed)
    const imageFiles = files.filter((file) => {
      const extname = path.extname(file);
      return ['.jpg', '.jpeg', '.png', '.gif'].includes(extname.toLowerCase());
    });

    // Create an array of image URLs
    const imageUrls = imageFiles.map((file) => `/images/${file}`);

    res.json({ images: imageUrls });
  });
});

// Route to upload an image
server.post('/imageUpload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // Get the image name from the uploaded file's filename
  const imageName = req.file.filename;

  // Add the image name to the imageUrls array
  imageUrls.push(`/images/${imageName}`);

  // You can send back the updated imageUrls array as a response
  res.json({ imageUrl: `/images/${imageName}` });
});

// Route to delete an image
server.delete('/deleteImage/:filename', (req, res) => {
  const filename = req.params.filename;
  const imagePath = path.join(__dirname, 'public', 'images', filename);

  // Use the 'fs' module to delete the image file
  fs.unlink(imagePath, (err) => {
    if (err) {
      return res.status(500).json({ error: 'Error deleting image' });
    }

    // Remove the deleted image URL from your 'imageUrls' array if needed
    const index = imageUrls.indexOf(`/images/${filename}`);
    if (index !== -1) {
      imageUrls.splice(index, 1);
    }

    res.json({ message: 'Image deleted successfully' });
  });
}

// Start the server
async function startServer() {
  await connectToDatabase();
  await setupRoutes();

  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

startServer();
