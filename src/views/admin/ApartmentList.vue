<template>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="flex justify-between items-center mb-6">
			<h1 class="text-2xl font-bold text-gray-900">Apartments</h1>
			<router-link
				to="/admin/apartments/add"
				class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
				Add New Apartment
			</router-link>
		</div>

		<div class="bg-white shadow overflow-hidden sm:rounded-lg">
			<div class="overflow-x-auto">
				<table class="min-w-full divide-y divide-gray-200">
					<thead class="bg-gray-50">
						<tr>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Apartment
							</th>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
								Location
							</th>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
								@click="sortBy('price')">
								Price/Night
							</th>
							<th
								scope="col"
								class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
								@click="sortBy('isActive')">
								Status
							</th>
							<th
								scope="col"
								class="relative px-6 py-3">
								<span class="sr-only">Actions</span>
							</th>
						</tr>
					</thead>
					<tbody class="bg-white divide-y divide-gray-200">
						<tr
							v-for="apartment in sortedApartments"
							:key="apartment._id"
							class="hover:bg-gray-50">
							<td class="px-6 py-4 whitespace-nowrap">
								<div class="flex items-center">
									<div class="flex-shrink-0 h-10 w-10">
										<img
											class="h-10 w-10 rounded-md object-cover"
											:src="apartment.images[0]"
											:alt="apartment.title" />
									</div>
									<div class="ml-4">
										<div class="text-sm font-medium text-gray-900">
											{{ apartment.title }}
										</div>
										<div class="text-sm text-gray-500">
											{{ apartment.bedrooms }} beds •
											{{ apartment.bathrooms }} baths
										</div>
									</div>
								</div>
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<div class="text-sm text-gray-900">
									{{ apartment.location }}
								</div>
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<div class="text-sm text-gray-900">${{ apartment.price }}</div>
							</td>
							<td class="px-6 py-4 whitespace-nowrap">
								<span
									:class="[
										'px-2 inline-flex text-xs leading-5 font-semibold rounded-full',
										apartment.isActive
											? 'bg-green-100 text-green-800'
											: 'bg-red-100 text-red-800'
									]">
									{{ apartment.isActive ? 'Active' : 'Inactive' }}
								</span>
							</td>
							<td
								class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
								<router-link
									:to="`/admin/apartments/edit/${apartment._id}`"
									class="text-indigo-600 hover:text-indigo-900 mr-4">
									Edit
								</router-link>
								<button
									@click="
										toggleApartmentStatus(apartment._id, !apartment.isActive)
									"
									class="text-indigo-600 hover:text-indigo-900 mr-4">
									{{ apartment.isActive ? 'Deactivate' : 'Activate' }}
								</button>
								<button
									@click="confirmDelete(apartment._id)"
									class="text-red-600 hover:text-red-900">
									Delete
								</button>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<div
				v-if="apartments.length === 0"
				class="text-center py-12">
				<p class="text-gray-500">
					No apartments found.
					<router-link
						to="/admin/apartments/add"
						class="text-indigo-600 hover:text-indigo-800"
						>Add your first apartment</router-link
					>
					to get started.
				</p>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useApartmentStore } from '../../stores/apartments';
import { storeToRefs } from 'pinia';
import type { Apartment } from '../../stores/apartments';

const router = useRouter();
const apartmentStore = useApartmentStore();
const { apartments, loading, error } = storeToRefs(apartmentStore);
const sortKey = ref<'price' | 'isActive' | ''>('');
const sortOrder = ref<'asc' | 'desc'>('asc');

const sortedApartments = computed(() => {
  if (!sortKey.value) {
    return apartments.value;
  }
  return [...apartments.value].sort((a, b) => {
    let valA = a[sortKey.value];
    let valB = b[sortKey.value];

    if (sortKey.value === 'isActive') {
      valA = valA ? 1 : 0;
      valB = valB ? 1 : 0;
    }

    if (valA < valB) {
      return sortOrder.value === 'asc' ? -1 : 1;
    }
    if (valA > valB) {
      return sortOrder.value === 'asc' ? 1 : -1;
    }
    return 0;
  });
});

const sortBy = (key: 'price' | 'isActive') => {
  if (sortKey.value === key) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortKey.value = key;
    sortOrder.value = 'asc';
  }
};

const toggleApartmentStatus = async (id: string, isActive: boolean) => {
  if (!confirm(`Are you sure you want to ${isActive ? 'activate' : 'deactivate'} this apartment?`)) {
    return;
  }

  try {
    await apartmentStore.toggleApartmentStatus(id, isActive);
  } catch (err) {
    console.error('Error toggling apartment status:', err);
    alert(error.value || 'Failed to update apartment status');
  }
};

const confirmDelete = async (id: string) => {
  if (!confirm('Are you sure you want to delete this apartment? This action cannot be undone.')) {
    return;
  }
  
  try {
    await apartmentStore.deleteApartment(id);
  } catch (err) {
    console.error('Error deleting apartment:', err);
    alert(error.value || 'Failed to delete apartment');
  }
};

onMounted(() => {
  apartmentStore.fetchAdminApartments().catch((err: Error) => {
    console.error('Failed to load apartments:', err);
    alert(error.value || 'Failed to load apartments');
  });
});
</script>
