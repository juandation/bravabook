import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api', (req, res) => {
	res.json({ message: 'API is working!' });
});

// Serve static files from the Angular app
app.use(express.static(path.join(__dirname, '../dist/bravabook')));

// All other GET requests not handled before will return the Angular app
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../dist/bravabook/index.html'));
});

// Connect to MongoDB and start the server
const startServer = async () => {
	try {
		await mongoose.connect(
			process.env.MONGODB_URI || 'mongodb://localhost:27017/bravabook'
		);
		console.log('Connected to MongoDB');

		app.listen(PORT, () => {
			console.log(`Server is running on http://localhost:${PORT}`);
		});
	} catch (error) {
		console.error('Error connecting to MongoDB:', error);
		process.exit(1);
	}
};

startServer();

export default app;
