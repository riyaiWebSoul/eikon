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

// Connect to the MongoDB database
async function connectToDatabase() {
  try {
    const db = await mongoose.connect('mongodb://127.0.0.1:27017/eikon', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Database connected');
    return db; // Return the MongoDB connection object
  } catch (err) {
    console.error('Error connecting to the database:', err);
    throw err;
  }
}

// Middleware to parse JSON request bodies
server.use(express.json());
server.use(morgan('default'));

// Serve static files from the 'public' directory
server.use(express.static('public'));
server.use(cors({
  origin: ["https://deploy-mean-1whq.vercel.app"],
  methods: ["POST", "GET"],
  credentials: true,
}));

// Configure Multer for handling file uploads
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
}

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
    const imageUrls = imageFiles.map((file) => `/${file}`);

    res.json({ images: imageUrls });
  });
});

// Add a route to fetch data from MongoDB
server.get('/getDataFromMongoDB', async (req, res) => {
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

// Start the server on port 8080
async function startServer() {
  await connectToDatabase();
  await setupRoutes();

  server.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
}

startServer();
