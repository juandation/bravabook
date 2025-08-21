import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
	{
		apartment: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'Apartment',
			required: true
		},
		checkInDate: {
			type: Date,
			required: true
		},
		checkOutDate: {
			type: Date,
			required: true
		},
		numberOfGuests: {
			type: Number,
			required: true
		},
		totalPrice: {
			type: Number,
			required: true
		},
		status: {
			type: String,
			enum: ['pending', 'confirmed', 'cancelled'],
			default: 'confirmed'
		}
	},
	{ timestamps: true }
);

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;
