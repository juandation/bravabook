import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Apartment from '../models/Apartment.model.js';

dotenv.config();

const sampleApartments = [
	{
		title: 'Modern Loft in Downtown',
		description:
			'Stylish loft apartment in the heart of the city with amazing views.',
		price: 120,
		location: 'New York, NY',
		bedrooms: 1,
		bathrooms: 1,
		squareMeters: 65,
		maxGuests: 2,
		isActive: true,
		images: [
			'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
		],
		amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'TV', 'Washer']
	},
	{
		title: 'Beachfront Villa with Pool',
		description:
			'Luxurious beachfront villa with private pool and stunning ocean views.',
		price: 350,
		location: 'Miami, FL',
		bedrooms: 3,
		bathrooms: 2.5,
		squareMeters: 180,
		maxGuests: 6,
		isActive: true,
		images: [
			'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
		],
		amenities: [
			'WiFi',
			'Kitchen',
			'Air Conditioning',
			'Pool',
			'Washer',
			'Dryer',
			'Free Parking'
		]
	},
	{
		title: 'Cozy Mountain Cabin',
		description:
			'Rustic cabin with modern amenities, perfect for a peaceful mountain getaway.',
		price: 95,
		location: 'Aspen, CO',
		bedrooms: 2,
		bathrooms: 1,
		squareMeters: 85,
		maxGuests: 4,
		isActive: true,
		images: [
			'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
		],
		amenities: ['WiFi', 'Kitchen', 'Heating', 'Fireplace', 'Free Parking']
	},
	{
		title: 'Luxury Penthouse with City Views',
		description:
			'High-end penthouse with panoramic city views and premium amenities.',
		price: 450,
		location: 'Los Angeles, CA',
		bedrooms: 3,
		bathrooms: 3,
		squareMeters: 220,
		maxGuests: 6,
		isActive: true,
		images: [
			'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80'
		],
		amenities: [
			'WiFi',
			'Kitchen',
			'Air Conditioning',
			'Gym',
			'Elevator',
			'Pool',
			'Doorman'
		]
	},
	{
		title: 'Charming Studio in Historic District',
		description:
			'Quaint studio apartment in a historic building with modern comforts.',
		price: 85,
		location: 'Boston, MA',
		bedrooms: 0,
		bathrooms: 1,
		squareMeters: 45,
		maxGuests: 2,
		isActive: true,
		images: [
			'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
		],
		amenities: ['WiFi', 'Kitchenette', 'Heating', 'TV']
	},
	{
		title: 'Spacious Family Home with Garden',
		description:
			'Large family home with a beautiful garden and plenty of space for everyone.',
		price: 200,
		location: 'Portland, OR',
		bedrooms: 4,
		bathrooms: 2,
		squareMeters: 180,
		maxGuests: 8,
		isActive: true,
		images: [
			'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
		],
		amenities: ['WiFi', 'Kitchen', 'Washer', 'Dryer', 'Garden', 'Free Parking']
	},
	{
		title: 'Modern Apartment in Downtown',
		description:
			'Sleek and modern apartment in the heart of the city with great amenities.',
		price: 150,
		location: 'Chicago, IL',
		bedrooms: 2,
		bathrooms: 2,
		squareMeters: 90,
		maxGuests: 4,
		isActive: true,
		images: [
			'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
		],
		amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Gym', 'Elevator']
	},
	{
		title: 'Lakeside Cottage with Dock',
		description:
			'Charming cottage right on the lake with private dock and stunning views.',
		price: 175,
		location: 'Lake Tahoe, CA',
		bedrooms: 2,
		bathrooms: 1,
		squareMeters: 95,
		maxGuests: 5,
		isActive: true,
		images: [
			'https://images.unsplash.com/photo-1572120360610-d127a3d6d1a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
		],
		amenities: ['WiFi', 'Kitchen', 'Heating', 'Dock', 'Free Parking']
	},
	{
		title: 'Stylish Condo in Arts District',
		description:
			'Trendy condo in the vibrant arts district with modern design.',
		price: 135,
		location: 'Austin, TX',
		bedrooms: 1,
		bathrooms: 1,
		squareMeters: 70,
		maxGuests: 3,
		isActive: true,
		images: [
			'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80'
		],
		amenities: ['WiFi', 'Kitchen', 'Air Conditioning', 'Gym', 'Pool']
	},
	{
		title: 'Luxury Ski Chalet',
		description: 'Luxury chalet with direct access to ski slopes and hot tub.',
		price: 400,
		location: 'Park City, UT',
		bedrooms: 4,
		bathrooms: 3.5,
		squareMeters: 250,
		maxGuests: 10,
		isActive: true,
		images: [
			'https://images.unsplash.com/photo-1551524164-687a55dd1126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80'
		],
		amenities: [
			'WiFi',
			'Kitchen',
			'Hot Tub',
			'Fireplace',
			'Washer',
			'Dryer',
			'Free Parking'
		]
	}
];

const seedDatabase = async () => {
	try {
		// Connect to MongoDB
				await mongoose.connect(
			process.env.MONGODB_URI || 'mongodb://mongodb:27017/bravabook',
			{
				useNewUrlParser: true,
				useUnifiedTopology: true
			}
		);

		console.log('Connected to MongoDB');

		// Clear existing data
		await Apartment.deleteMany({});
		console.log('Cleared existing apartment data');

		// Insert sample data
		const createdApartments = await Apartment.insertMany(sampleApartments);
		console.log(`Seeded ${createdApartments.length} apartments`);

		// Disconnect from MongoDB
		await mongoose.disconnect();
		console.log('Disconnected from MongoDB');
	} catch (error) {
		console.error('Error seeding database:', error);
		process.exit(1);
	}
};

seedDatabase();
