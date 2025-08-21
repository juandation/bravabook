<template>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<h1 class="text-2xl font-bold text-gray-900 mb-6">All Bookings</h1>
		<div class="bg-white shadow overflow-hidden sm:rounded-lg">
			<div class="overflow-x-auto">
				<table class="min-w-full divide-y divide-gray-200">
					<thead class="bg-gray-50">
						<tr>
							<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Apartment</th>
							<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
							<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Guests</th>
							<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Price</th>
							<th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						<tr v-for="booking in bookings" :key="booking._id" class="hover:bg-gray-50">
							<td class="px-6 py-4 whitespace-nowrap">
								<div class="text-sm font-medium text-gray-900">{{ booking.apartment.title }}</div>
								<div class="text-sm text-gray-500">{{ booking.apartment.location }}</div>
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<div class="text-sm text-gray-900">{{ new Date(booking.checkInDate).toLocaleDateString() }} - {{ new Date(booking.checkOutDate).toLocaleDateString() }}</div>
							</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ booking.numberOfGuests }}</td>
							<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${{ booking.totalPrice.toFixed(2) }}</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<span :class="['px-2 inline-flex text-xs leading-5 font-semibold rounded-full', booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800']">
									{{ booking.status }}
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div v-if="bookings.length === 0" class="text-center py-12">
				<p class="text-gray-500">No bookings found.</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { useBookingStore } from '../../stores/bookings';
import { storeToRefs } from 'pinia';

const bookingStore = useBookingStore();
const { bookings, loading, error } = storeToRefs(bookingStore);

onMounted(() => {
  bookingStore.fetchBookings().catch((err: Error) => {
    console.error('Failed to load bookings:', err);
    alert(error.value || 'Failed to load bookings');
  });
});
</script>
