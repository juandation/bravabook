import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';
import type { Apartment } from './apartments';

export interface Booking {
  _id?: string;
  apartment: Apartment;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'cancelled';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface BookingData {
  apartment: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfGuests: number;
  totalPrice: number;
}

export const useBookingStore = defineStore('bookings', () => {
  const bookings = ref<Booking[]>([]);
  const apartmentBookings = ref<Booking[]>([]);
  const loading = ref(false);
  const isBooking = ref(false);
  const error = ref<string | null>(null);

  const fetchBookings = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get('/api/admin/bookings');
      bookings.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch bookings';
      console.error('Error fetching bookings:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const createBooking = async (bookingData: BookingData) => {
    isBooking.value = true;
    error.value = null;
    try {
      await axios.post('/api/bookings', bookingData);
    } catch (err) {
      error.value = 'Failed to create booking';
      console.error('Error creating booking:', err);
      throw err;
    } finally {
      isBooking.value = false;
    }
  };

  const fetchBookingsForApartment = async (apartmentId: string) => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`/api/apartments/${apartmentId}/bookings`);
      apartmentBookings.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch apartment bookings';
      console.error('Error fetching apartment bookings:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    bookings,
    apartmentBookings,
    loading,
    isBooking,
    error,
    createBooking,
    fetchBookings,
    fetchBookingsForApartment
  };
});
