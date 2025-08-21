import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import Apartment from '../models/Apartment.model.js';
import Booking from '../models/Booking.model.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration - only apply to API routes
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Apply CORS to API routes
app.use('/api', cors(corsOptions));

mongoose
	.connect(process.env.MONGODB_URI || 'mongodb://mongodb:27017/bravabook')
	.then(() => console.log('Connected to MongoDB'))
	.catch((err) => console.error('MongoDB connection error:', err));


// API Routes

// Get all apartments (public)
app.get('/api/apartments', async (req, res) => {
	try {
		const { location, guests, maxPrice } = req.query;
		const query = { isActive: true };

		if (location) {
			query.location = { $regex: location, $options: 'i' };
		}

		if (guests) {
			query.maxGuests = { $gte: parseInt(guests) };
		}

		if (maxPrice) {
			query.price = { $lte: parseFloat(maxPrice) };
		}

		const apartments = await Apartment.find(query);
		res.json(apartments);
	} catch (error) {
		console.error('Error fetching apartments:', error);
		res.status(500).json({ message: 'Server error' });
	}
});

// Get bookings for a single apartment (public)
app.get('/api/apartments/:id/bookings', async (req, res) => {
	try {
		const bookings = await Booking.find({ apartment: req.params.id });
		res.json(bookings);
	} catch (error) {
		console.error('Error fetching bookings:', error);
		res.status(500).json({ message: 'Server error' });
	}
});

// Get single apartment (public)
app.get('/api/apartments/:id', async (req, res) => {
	try {
		const apartment = await Apartment.findById(req.params.id);
		if (!apartment) {
			return res.status(404).json({ message: 'Apartment not found' });
		}
		res.json(apartment);
	} catch (error) {
		console.error('Error fetching apartment:', error);
		res.status(500).json({ message: 'Server error' });
	}
});

// Admin routes
const adminRouter = express.Router();

// Get all apartments (admin)
adminRouter.get('/apartments', async (req, res) => {
	try {
		const apartments = await Apartment.find().sort({ createdAt: -1 });
		res.json(apartments);
	} catch (error) {
		console.error('Error fetching apartments:', error);
		res.status(500).json({ message: 'Server error' });
	}
});

// Get single apartment (admin)
adminRouter.get('/apartments/:id', async (req, res) => {
	try {
		const apartment = await Apartment.findById(req.params.id);
		if (!apartment) {
			return res.status(404).json({ message: 'Apartment not found' });
		}
		res.json(apartment);
	} catch (error) {
		console.error('Error fetching apartment:', error);
		res.status(500).json({ message: 'Server error' });
	}
});

// Create new apartment
adminRouter.post('/apartments', async (req, res) => {
	try {
		const apartment = new Apartment(req.body);
		await apartment.save();
		res.status(201).json(apartment);
	} catch (error) {
		console.error('Error creating apartment:', error);
		res.status(500).json({ message: 'Error creating apartment' });
	}
});

// Update apartment
adminRouter.put('/apartments/:id', async (req, res) => {
	try {
		const apartment = await Apartment.findByIdAndUpdate(
			req.params.id,
			{ ...req.body, updatedAt: Date.now() },
			{ new: true, runValidators: true }
		);

		if (!apartment) {
			return res.status(404).json({ message: 'Apartment not found' });
		}

		res.json(apartment);
	} catch (error) {
		console.error('Error updating apartment:', error);
		res.status(500).json({ message: 'Error updating apartment' });
	}
});

// Update apartment status
adminRouter.patch('/apartments/:id/status', async (req, res) => {
	try {
		const { isActive } = req.body;
		const apartment = await Apartment.findByIdAndUpdate(
			req.params.id,
			{ isActive, updatedAt: Date.now() },
			{ new: true }
		);

		if (!apartment) {
			return res.status(404).json({ message: 'Apartment not found' });
		}

		res.json(apartment);
	} catch (error) {
		console.error('Error updating apartment status:', error);
		res.status(500).json({ message: 'Error updating apartment status' });
	}
});

// Delete apartment
adminRouter.delete('/apartments/:id', async (req, res) => {
	try {
		const apartment = await Apartment.findByIdAndDelete(req.params.id);

		if (!apartment) {
			return res.status(404).json({ message: 'Apartment not found' });
		}

		res.json({ message: 'Apartment deleted successfully' });
	} catch (error) {
		console.error('Error deleting apartment:', error);
		res.status(500).json({ message: 'Error deleting apartment' });
	}
});

// Book apartment
app.post('/api/bookings', async (req, res) => {
	try {
		const { apartment, checkInDate, checkOutDate } = req.body;

		const existingBooking = await Booking.findOne({
			apartment,
			$or: [
				{ checkInDate: { $lt: checkOutDate }, checkOutDate: { $gt: checkInDate } }
			]
		});

		if (existingBooking) {
			return res.status(409).json({ message: 'The apartment is already booked for the selected dates.' });
		}

		const booking = new Booking(req.body);
		await booking.save();
		res.status(201).json(booking);
	} catch (error) {
		console.error('Error creating booking:', error);
		res.status(500).json({ message: 'Error creating booking' });
	}
});

// Get all bookings (admin)
adminRouter.get('/bookings', async (req, res) => {
	try {
		const bookings = await Booking.find().populate('apartment').sort({ createdAt: -1 });
		res.json(bookings);
	} catch (error) {
		console.error('Error fetching bookings:', error);
		res.status(500).json({ message: 'Server error' });
	}
});

// Mount admin routes
app.use('/api/admin', adminRouter);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).json({ message: 'Something went wrong!' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
	console.log(`Server running on port ${PORT}`);
});

export default app;
