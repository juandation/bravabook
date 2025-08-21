<template>
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
		<div class="bg-white shadow overflow-hidden sm:rounded-lg">
			<div class="px-4 py-5 sm:px-6 border-b border-gray-200">
				<h3 class="text-lg leading-6 font-medium text-gray-900">
					{{ isEdit ? 'Edit Apartment' : 'Add New Apartment' }}
				</h3>
			</div>

			<form
				@submit.prevent="handleSubmit"
				class="p-6 space-y-8">
				<!-- Basic Information -->
				<div>
					<h4 class="text-lg font-medium text-gray-900 mb-4">
						Basic Information
					</h4>
					<div class="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
						<!-- Title -->
						<div class="sm:col-span-6">
							<label
								for="title"
								class="block text-sm font-medium text-gray-700"
								>Title</label
							>
							<input
								type="text"
								id="title"
								v-model="formData.title"
								required
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
						</div>

						<!-- Description -->
						<div class="sm:col-span-6">
							<label
								for="description"
								class="block text-sm font-medium text-gray-700"
								>Description</label
							>
							<textarea
								id="description"
								rows="3"
								v-model="formData.description"
								required
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
						</div>

						<!-- Location -->
						<div class="sm:col-span-6">
							<label
								for="location"
								class="block text-sm font-medium text-gray-700"
								>Location</label
							>
							<input
								type="text"
								id="location"
								v-model="formData.location"
								required
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
						</div>

						<!-- Price -->
						<div class="sm:col-span-2">
							<label
								for="price"
								class="block text-sm font-medium text-gray-700"
								>Price per night ($)</label
							>
							<div class="mt-1 relative rounded-md shadow-sm">
								<div
									class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
									<span class="text-gray-500 sm:text-sm">$</span>
								</div>
								<input
									type="number"
									id="price"
									v-model.number="formData.price"
									min="0"
									step="0.01"
									required
									class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" />
							</div>
						</div>

						<!-- Bedrooms -->
						<div class="sm:col-span-1">
							<label
								for="bedrooms"
								class="block text-sm font-medium text-gray-700"
								>Bedrooms</label
							>
							<input
								type="number"
								id="bedrooms"
								v-model.number="formData.bedrooms"
								min="1"
								required
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
						</div>

						<!-- Bathrooms -->
						<div class="sm:col-span-1">
							<label
								for="bathrooms"
								class="block text-sm font-medium text-gray-700"
								>Bathrooms</label
							>
							<input
								type="number"
								id="bathrooms"
								v-model.number="formData.bathrooms"
								min="1"
								step="0.5"
								required
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
						</div>

						<!-- Square Meters -->
						<div class="sm:col-span-2">
							<label
								for="squareMeters"
								class="block text-sm font-medium text-gray-700"
								>Size (m²)</label
							>
							<input
								type="number"
								id="squareMeters"
								v-model.number="formData.squareMeters"
								min="1"
								required
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
						</div>

						<!-- Max Guests -->
						<div class="sm:col-span-2">
							<label
								for="maxGuests"
								class="block text-sm font-medium text-gray-700"
								>Max Guests</label
							>
							<input
								type="number"
								id="maxGuests"
								v-model.number="formData.maxGuests"
								min="1"
								required
								class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm" />
						</div>

						<!-- Status -->
						<div class="sm:col-span-2">
							<label
								for="isActive"
								class="block text-sm font-medium text-gray-700"
								>Status</label
							>
							<select
								id="isActive"
								v-model="formData.isActive"
								class="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm">
								<option :value="true">Active</option>
								<option :value="false">Inactive</option>
							</select>
						</div>
					</div>
				</div>

				<!-- Images -->
				<div>
					<h4 class="text-lg font-medium text-gray-900 mb-4">Images</h4>
					<div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div
							v-for="(image, index) in formData.images"
							:key="index"
							class="relative group">
							<img
								:src="image"
								class="h-40 w-full object-cover rounded-md" />
							<button
								type="button"
								@click="removeImage(index)"
								class="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-4 w-4"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor">
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										stroke-width="2"
										d="M6 18L18 6M6 6l12 12" />
								</svg>
							</button>
						</div>
						<div
							class="flex items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6">
							<div class="text-center">
								<svg
									class="mx-auto h-12 w-12 text-gray-400"
									stroke="currentColor"
									fill="none"
									viewBox="0 0 48 48"
									aria-hidden="true">
									<path
										d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round" />
								</svg>
								<div class="mt-1 text-sm text-gray-600">
									<label
										for="file-upload"
										class="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">
										<span>Upload an image</span>
										<input
											id="file-upload"
											name="file-upload"
											type="file"
											class="sr-only"
											accept="image/*"
											@change="handleImageUpload" />
									</label>
								</div>
								<p class="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
							</div>
						</div>
					</div>
				</div>

				<!-- Amenities -->
				<div>
					<h4 class="text-lg font-medium text-gray-900 mb-4">Amenities</h4>
					<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
						<div
							v-for="amenity in availableAmenities"
							:key="amenity"
							class="flex items-center">
							<input
								:id="`amenity-${amenity}`"
								v-model="formData.amenities"
								type="checkbox"
								:value="amenity"
								class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
							<label
								:for="`amenity-${amenity}`"
								class="ml-2 text-sm text-gray-700">
								{{ amenity }}
							</label>
						</div>
					</div>
				</div>

				<!-- Form Actions -->
				<div class="pt-5">
					<div class="flex justify-end space-x-3">
						<router-link
							to="/admin/apartments"
							class="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
							Cancel
						</router-link>
						<button
							type="submit"
							:disabled="isSubmitting"
							class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
							{{ isSubmitting ? 'Saving...' : 'Save' }}
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useApartmentStore } from '../../stores/apartments';
import type { Apartment } from '../../stores/apartments';

// Types
interface FormImage {
  url: string;
  file?: File;
  isNew?: boolean;
  id?: string;
}

interface FormRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  step?: number;
  message?: string;
  pattern?: RegExp;
  validate?: (value: any) => string | boolean;
}

type FormRules = Record<string, FormRule>;
type FormField = keyof Omit<Apartment, '_id' | 'createdAt' | 'updatedAt'>;

// Component Props
interface Props {
  isEdit?: boolean;
}

// Component Emits
const emit = defineEmits<{
  (e: 'success'): void;
  (e: 'error', error: Error): void;
}>();

const props = withDefaults(defineProps<Props>(), {
  isEdit: false,
});

// Router and Store
const router = useRouter();
const route = useRoute();
const apartmentStore = useApartmentStore();
const { error: storeError } = storeToRefs(apartmentStore);

// State
const isSubmitting = ref(false);
const imageObjectUrls = ref<Set<string>>(new Set());
const formErrors = reactive<Partial<Record<FormField, string>>>({});

// Constants
const availableAmenities = [
  'WiFi',
  'Kitchen',
  'Air Conditioning',
  'Heating',
  'TV',
  'Washer',
  'Dryer',
  'Free Parking',
  'Pool',
  'Gym',
  'Hot Tub',
  'Pets Allowed',
  'Elevator',
  'Wheelchair Accessible'
];

// Form Data
const formData = reactive<Omit<Apartment, '_id' | 'createdAt' | 'updatedAt'>>({
  title: '',
  description: '',
  price: 0,
  location: '',
  bedrooms: 1,
  bathrooms: 1,
  squareMeters: 50,
  maxGuests: 2,
  isActive: true,
  images: [],
  amenities: []
});

// Form Validation Rules
const formRules: FormRules = {
  title: { 
    required: true, 
    minLength: 3, 
    maxLength: 100,
    message: 'Title must be between 3 and 100 characters'
  },
  description: { 
    required: true, 
    minLength: 10, 
    maxLength: 2000,
    message: 'Description must be between 10 and 2000 characters'
  },
  price: { 
    required: true, 
    min: 0, 
    max: 10000,
    message: 'Price must be between $0 and $10,000'
  },
  location: { 
    required: true, 
    minLength: 3, 
    maxLength: 200,
    message: 'Location must be between 3 and 200 characters'
  },
  bedrooms: { 
    required: true, 
    min: 0, 
    max: 20,
    message: 'Number of bedrooms must be between 0 and 20'
  },
  bathrooms: { 
    required: true, 
    min: 0.5, 
    max: 20, 
    step: 0.5,
    message: 'Number of bathrooms must be between 0.5 and 20'
  },
  squareMeters: { 
    required: true, 
    min: 10, 
    max: 1000,
    message: 'Size must be between 10 and 1000 square meters'
  },
  maxGuests: { 
    required: true, 
    min: 1, 
    max: 50,
    message: 'Maximum guests must be between 1 and 50'
  },
  images: { 
    required: true, 
    validate: (value: any[]) => value.length > 0 || 'At least one image is required'
  }
};

// Helper Functions
const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === 'string' && value.trim().length > 0;
};

const getApartmentId = (): string | undefined => {
  const id = Array.isArray(route.params.id) 
    ? route.params.id[0] 
    : route.params.id;
  return isNonEmptyString(id) ? id : undefined;
};

// Form Validation
const validateField = (field: string, value: any): string => {
  const rule = formRules[field as keyof typeof formRules];
  if (!rule) return '';

  if (rule.required && (!value || (Array.isArray(value) && value.length === 0))) {
    return rule.message || `${field} is required`;
  }

  if (value === undefined || value === null || value === '') {
    return '';
  }

  if (typeof value === 'string') {
    if (rule.minLength && value.length < rule.minLength) {
      return rule.message || `${field} must be at least ${rule.minLength} characters`;
    }
    if (rule.maxLength && value.length > rule.maxLength) {
      return rule.message || `${field} must be at most ${rule.maxLength} characters`;
    }
  }

  if (typeof value === 'number') {
    if (rule.min !== undefined && value < rule.min) {
      return rule.message || `${field} must be at least ${rule.min}`;
    }
    if (rule.max !== undefined && value > rule.max) {
      return rule.message || `${field} must be at most ${rule.max}`;
    }
  }

  if (rule.pattern && typeof value === 'string' && !rule.pattern.test(value)) {
    return rule.message || `${field} is not valid`;
  }

  if (rule.validate) {
    const validationResult = rule.validate(value);
    if (typeof validationResult === 'string') {
      return validationResult;
    } else if (validationResult === false) {
      return rule.message || `${field} is not valid`;
    }
  }

  return '';
};

const validateForm = (): boolean => {
  let isValid = true;
  Object.entries(formData).forEach(([field, value]) => {
    const error = validateField(field, value);
    if (error) {
      formErrors[field as FormField] = error;
      isValid = false;
    } else {
      delete formErrors[field as FormField];
    }
  });
  return isValid;
};

// Image Handling
const handleImageUpload = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    const imageUrl = URL.createObjectURL(file);
    formData.images = [...formData.images, imageUrl];
    imageObjectUrls.value.add(imageUrl);
    target.value = '';
    
    if (formErrors['images']) {
      delete formErrors['images'];
    }
  }
};

const removeImage = (index: number) => {
  const removedImage = formData.images[index];
  formData.images.splice(index, 1);
  
  if (removedImage.startsWith('blob:')) {
    URL.revokeObjectURL(removedImage);
    imageObjectUrls.value.delete(removedImage);
  }
};

// Form Submission
const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }
  
  isSubmitting.value = true;
  
  try {
    if (props.isEdit) {
      const id = getApartmentId();
      if (id) {
        await apartmentStore.updateApartment(id, formData);
      }
    } else {
      await apartmentStore.createApartment(formData);
    }
    
    emit('success');
    router.push('/admin/apartments');
  } catch (error) {
    emit('error', error as Error);
  } finally {
    isSubmitting.value = false;
  }
};

// Lifecycle Hooks
onMounted(async () => {
  const id = getApartmentId();
  if (id) {
    try {
      const apartment = await apartmentStore.fetchAdminApartment(id);
      if (apartment) {
        formData.title = apartment.title || '';
        formData.description = apartment.description || '';
        formData.location = apartment.location || '';
        formData.price = apartment.price || 0;
        formData.bedrooms = apartment.bedrooms || 1;
        formData.bathrooms = apartment.bathrooms || 1;
        formData.squareMeters = apartment.squareMeters || 0;
        formData.maxGuests = apartment.maxGuests || 1;
        formData.isActive = apartment.isActive ?? true;
        formData.images = Array.isArray(apartment.images) ? [...apartment.images] : [];
        formData.amenities = Array.isArray(apartment.amenities) ? [...apartment.amenities] : [];
      }
    } catch (error) {
      console.error('Error loading apartment:', error);
    }
  }
});

onBeforeUnmount(() => {
  imageObjectUrls.value.forEach(url => URL.revokeObjectURL(url));
  imageObjectUrls.value.clear();
});
</script>
