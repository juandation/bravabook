<template>
	<div>
		<div class="mb-8">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="bg-white shadow rounded-lg p-6">
					<h2 class="text-lg font-medium text-gray-900 mb-4">
						Find your perfect stay
					</h2>
					<div class="grid grid-cols-1 md:grid-cols-4 gap-4">
						<div>
							<label
								for="location"
								class="block text-sm font-medium text-gray-700"
								>Location</label
							>
							<input
								type="text"
								id="location"
								v-model="searchQuery.location"
								placeholder="Anywhere"
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
						</div>
						<div>
							<label
								for="guests"
								class="block text-sm font-medium text-gray-700"
								>Guests</label
							>
							<input
								type="number"
								id="guests"
								v-model.number="searchQuery.guests"
								min="1"
								placeholder="How many?"
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
						</div>
						<div>
							<label
								for="price"
								class="block text-sm font-medium text-gray-700"
								>Max Price</label
							>
							<input
								type="number"
								id="price"
								v-model.number="searchQuery.maxPrice"
								min="0"
								placeholder="Any price"
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
						</div>
						<div class="flex items-end">
							<button
								@click="searchApartments"
								class="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
								Search
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>

		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				<div
					v-for="apartment in apartments"
					:key="apartment._id"
					class="bg-white rounded-lg shadow overflow-hidden hover:shadow-md transition-shadow duration-300">
					<router-link
						:to="`/apartment/${apartment._id}`"
						class="block">
						<div class="h-48 bg-gray-200 overflow-hidden">
							<img
								:src="apartment.images[0]"
								:alt="apartment.title"
								class="w-full h-full object-cover" />
						</div>
						<div class="p-4">
							<div class="flex justify-between items-start">
								<h3 class="text-lg font-medium text-gray-900">
									{{ apartment.title }}
								</h3>
								<span class="text-lg font-semibold text-indigo-600"
									>${{ apartment.price }}/night</span
								>
							</div>
							<p class="mt-1 text-sm text-gray-500">{{ apartment.location }}</p>
							<div class="mt-2 flex items-center text-sm text-gray-500">
								<span class="mr-2">
									{{ apartment.bedrooms }}
									{{ apartment.bedrooms === 1 ? 'bedroom' : 'bedrooms' }}
								</span>
								<span>•</span>
								<span class="mx-2"
									>{{ apartment.bathrooms }}
									{{ apartment.bathrooms === 1 ? 'bath' : 'baths' }}</span
								>
								<span>•</span>
								<span class="ml-2">{{ apartment.squareMeters }} m²</span>
							</div>
						</div>
					</router-link>
				</div>
			</div>

			<div
				v-if="apartments.length === 0"
				class="text-center py-12">
				<p class="text-gray-500">
					No apartments found. Try adjusting your search criteria.
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

interface Apartment {
	_id: string;
	title: string;
	price: number;
	location: string;
	bedrooms: number;
	bathrooms: number;
	squareMeters: number;
	images: string[];
	amenities: string[];
}

const apartments = ref<Apartment[]>([]);
const searchQuery = ref({
	location: '',
	guests: null as number | null,
	maxPrice: null as number | null
});

const fetchApartments = async () => {
	try {
		const params = new URLSearchParams();
		if (searchQuery.value.location)
			params.append('location', searchQuery.value.location);
		if (searchQuery.value.guests)
			params.append('guests', searchQuery.value.guests.toString());
		if (searchQuery.value.maxPrice)
			params.append('maxPrice', searchQuery.value.maxPrice.toString());

		const response = await axios.get(`/api/apartments?${params.toString()}`);
		apartments.value = response.data;
	} catch (error) {
		console.error('Error fetching apartments:', error);
	}
};

const searchApartments = () => {
	fetchApartments();
};

onMounted(() => {
	fetchApartments();
});
</script>
