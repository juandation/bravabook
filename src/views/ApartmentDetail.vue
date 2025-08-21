<template>
	<div
		v-if="apartment"
		class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="bg-white shadow overflow-hidden sm:rounded-lg">
			<!-- Image Gallery -->
			<div class="relative">
				<div class="h-96 bg-gray-200 overflow-hidden">
					<img
						:src="apartment.images[0]"
						:alt="apartment.title"
						class="w-full h-full object-cover" />
				</div>
			</div>

			<!-- Apartment Info -->
			<div class="px-4 py-5 sm:px-6">
				<div class="flex flex-col md:flex-row justify-between">
					<div>
						<h1 class="text-3xl font-bold text-gray-900">
							{{ apartment.title }}
						</h1>
						<p class="mt-1 text-lg text-gray-600">{{ apartment.location }}</p>
					</div>
					<div class="mt-4 md:mt-0">
						<span class="text-2xl font-bold text-indigo-600"
							>${{ apartment.price }}</span
						>
						<span class="text-gray-500"> / night</span>
					</div>
				</div>

				<!-- Amenities -->
				<div class="mt-6">
					<h2 class="text-lg font-medium text-gray-900">Amenities</h2>
					<div
						class="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
						<div
							v-for="amenity in apartment.amenities"
							:key="amenity"
							class="flex items-center">
							<span class="text-indigo-500 mr-2">✓</span>
							<span class="text-gray-700">{{ amenity }}</span>
						</div>
					</div>
				</div>

				<!-- Description -->
				<div class="mt-6">
					<h2 class="text-lg font-medium text-gray-900">About this place</h2>
					<p class="mt-2 text-gray-600">
						{{ apartment.description || 'No description available.' }}
					</p>
				</div>

				<!-- Details -->
				<div class="mt-6 border-t border-gray-200 pt-6">
					<h2 class="text-lg font-medium text-gray-900">Details</h2>
					<div class="mt-2 grid grid-cols-2 gap-4">
						<div class="flex items-center">
							<span class="text-gray-500 mr-2">Bedrooms:</span>
							<span class="font-medium">{{ apartment.bedrooms }}</span>
						</div>
						<div class="flex items-center">
							<span class="text-gray-500 mr-2">Bathrooms:</span>
							<span class="font-medium">{{ apartment.bathrooms }}</span>
						</div>
						<div class="flex items-center">
							<span class="text-gray-500 mr-2">Size:</span>
							<span class="font-medium">{{ apartment.squareMeters }} m²</span>
						</div>
						<div class="flex items-center">
							<span class="text-gray-500 mr-2">Max Guests:</span>
							<span class="font-medium">{{ apartment.maxGuests }}</span>
						</div>
					</div>
				</div>
			</div>

			<!-- Booking Form -->
			<div class="bg-gray-50 px-4 py-5 sm:px-6 border-t border-gray-200">
				<h2 class="text-lg font-medium text-gray-900 mb-4">Book this place</h2>
				<form
					@submit.prevent="handleBooking"
					class="space-y-4">
					<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div class="md:col-span-2">
                <label for="booking-dates" class="block text-sm font-medium text-gray-700">Dates</label>
                <date-picker
                  id="booking-dates"
                  v-model:value="booking.dates"
                  range
                  :disabled-date="isDateDisabled"
                  placeholder="Select your dates"
                  class="mt-1 w-full"
                ></date-picker>
              </div>
              <div>
                <label for="guests" class="block text-sm font-medium text-gray-700">Guests</label>
                <input
                  type="number"
                  id="guests"
                  v-model.number="booking.numberOfGuests"
                  :min="1"
                  :max="apartment.maxGuests"
                  required
                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div class="flex items-end">
                <button
                  type="submit"
                  class="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                  :disabled="isBooking || !booking.dates || booking.dates.length < 2 || !booking.dates[0] || !booking.dates[1]"
                >
                  {{ isBooking ? 'Booking...' : 'Book Now' }}
                </button>
              </div>
            </div>
				</form>
			</div>
		</div>
	</div>
	<div
		v-else
		class="text-center py-12">
		<p class="text-gray-500">Loading apartment details...</p>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useBookingStore } from '../stores/bookings';
import { storeToRefs } from 'pinia';
import DatePicker from 'vue-datepicker-next';
import 'vue-datepicker-next/index.css';

interface Apartment {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  maxGuests: number;
  images: string[];
  amenities: string[];
}

const route = useRoute();
const router = useRouter();
const apartment = ref<Apartment | null>(null);

const bookingStore = useBookingStore();
const { apartmentBookings, isBooking } = storeToRefs(bookingStore);

const booking = ref({
  dates: [] as Date[],
  numberOfGuests: 1,
});

const isDateDisabled = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (date < today) {
    return true;
  }

  for (const b of apartmentBookings.value) {
    const checkIn = new Date(b.checkInDate);
    const checkOut = new Date(b.checkOutDate);
    if (date >= checkIn && date < checkOut) {
      return true;
    }
  }
  return false;
};

const fetchApartment = async () => {
  try {
    const response = await axios.get(`/api/apartments/${route.params.id}`);
    apartment.value = response.data;
  } catch (error) {
    console.error('Error fetching apartment:', error);
    router.push('/');
  }
};

const totalPrice = computed(() => {
  if (!apartment.value || !booking.value.dates || booking.value.dates.length < 2) {
    return 0;
  }
  const [checkIn, checkOut] = booking.value.dates;
  if (!checkIn || !checkOut) return 0;
  const nights = (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 3600 * 24);
  return nights > 0 ? nights * apartment.value.price : 0;
});

const handleBooking = async () => {
  if (!apartment.value || !booking.value.dates || booking.value.dates.length < 2) {
    alert('Please select a valid date range.');
    return;
  }

  const [checkInDate, checkOutDate] = booking.value.dates;

  try {
    await bookingStore.createBooking({
      apartment: apartment.value._id,
      checkInDate: new Date(checkInDate).toISOString(),
      checkOutDate: new Date(checkOutDate).toISOString(),
      numberOfGuests: booking.value.numberOfGuests,
      totalPrice: totalPrice.value,
    });

    alert('Booking successful!');
    router.push('/');
  } catch (error) {
    console.error('Error creating booking:', error);
    alert(bookingStore.error || 'Failed to book. Please try again.');
  }
};

onMounted(async () => {
  await fetchApartment();
  if (apartment.value) {
    bookingStore.fetchBookingsForApartment(apartment.value._id);
  }
});
</script>
