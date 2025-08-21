import { defineStore } from 'pinia';
import { ref } from 'vue';
import axios from 'axios';

export interface Apartment {
  _id?: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  maxGuests: number;
  isActive: boolean;
  images: string[];
  amenities: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export const useApartmentStore = defineStore('apartments', () => {
  const apartments = ref<Apartment[]>([]);
  const loading = ref(false);
  const error = ref<string | null>(null);

  const fetchApartments = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get('/api/apartments');
      apartments.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch apartments';
      console.error('Error fetching apartments:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchApartment = async (id: string): Promise<Apartment> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`/api/apartments/${id}`);
      return response.data;
    } catch (err) {
      error.value = 'Failed to fetch apartment details';
      console.error('Error fetching apartment:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const createApartment = async (apartment: Omit<Apartment, '_id'>): Promise<Apartment> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.post('/api/admin/apartments', apartment);
      return response.data;
    } catch (err) {
      error.value = 'Failed to create apartment';
      console.error('Error creating apartment:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const updateApartment = async (id: string, apartment: Partial<Apartment>): Promise<Apartment> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.put(`/api/admin/apartments/${id}`, apartment);
      return response.data;
    } catch (err) {
      error.value = 'Failed to update apartment';
      console.error('Error updating apartment:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const deleteApartment = async (id: string): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      await axios.delete(`/api/admin/apartments/${id}`);
      apartments.value = apartments.value.filter(apt => apt._id !== id);
    } catch (err) {
      error.value = 'Failed to delete apartment';
      console.error('Error deleting apartment:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const toggleApartmentStatus = async (id: string, isActive: boolean): Promise<void> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.patch(`/api/admin/apartments/${id}/status`, { isActive });
      const apartment = apartments.value.find(a => a._id === id);
      if (apartment) {
        apartment.isActive = response.data.isActive;
      }
    } catch (err) {
      error.value = 'Failed to update apartment status';
      console.error('Error toggling apartment status:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchAdminApartments = async () => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get('/api/admin/apartments');
      apartments.value = response.data;
    } catch (err) {
      error.value = 'Failed to fetch apartments';
      console.error('Error fetching apartments:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  const fetchAdminApartment = async (id: string): Promise<Apartment> => {
    loading.value = true;
    error.value = null;
    try {
      const response = await axios.get(`/api/admin/apartments/${id}`);
      return response.data;
    } catch (err) {
      error.value = 'Failed to fetch apartment details';
      console.error('Error fetching apartment:', err);
      throw err;
    } finally {
      loading.value = false;
    }
  };

  return {
    apartments,
    loading,
    error,
    fetchApartments,
    fetchApartment,
    createApartment,
    updateApartment,
    deleteApartment,
    toggleApartmentStatus,
    fetchAdminApartment,
    fetchAdminApartments
  };
});
