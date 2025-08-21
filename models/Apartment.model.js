import mongoose from 'mongoose';

// Obtener solamente aquellas funcionalidad (objetos) que necesites para implementar tu funcionalidad. 
const { Schema, model } = mongoose;

const apartmentSchema = new Schema({
	title: { type: String, required: true },
	description: { type: String, required: true },
	price: { type: Number, required: true, min: 0 },
	location: { type: String, required: true },
	bedrooms: { type: Number, required: true, min: 0 },
	bathrooms: { type: Number, required: true, min: 1 },
	squareMeters: { type: Number, required: true, min: 1 },
	maxGuests: { type: Number, required: true, min: 1 },
	isActive: { type: Boolean, default: true },
	images: [{ type: String }],
	amenities: [{ type: String }],
	createdAt: { type: Date, default: Date.now },
	updatedAt: { type: Date, default: Date.now }
});

const Apartment = model('Apartment', apartmentSchema);

export default Apartment;
