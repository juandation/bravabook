import { createApp } from 'vue';
import { createPinia } from 'pinia';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './style.css';

const app = createApp(App);

// Initialize Pinia for state management
const pinia = createPinia();
app.use(pinia);

// Set up router
const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: () => import('./views/HomeView.vue')
		},
		{
			path: '/apartment/:id',
			name: 'apartment-detail',
			component: () => import('./views/ApartmentDetail.vue')
		},
		{
			path: '/admin',
			redirect: '/admin/apartments'
		},
		{
			path: '/admin/apartments',
			name: 'admin-apartments',
			component: () => import('./views/admin/ApartmentList.vue')
		},
		{
			path: '/admin/apartments/add',
			name: 'add-apartment',
			component: () => import('./views/admin/AddApartment.vue')
		},
		{
			path: '/admin/apartments/edit/:id',
			name: 'edit-apartment',
			component: () => import('./views/admin/EditApartment.vue'),
			props: true
		},
		{
			path: '/admin/bookings',
			name: 'admin-bookings',
			component: () => import('./views/admin/BookingList.vue')
		},
		{
			path: '/:pathMatch(.*)*',
			redirect: '/'
		}
	],
	scrollBehavior(to, from, savedPosition) {
		return savedPosition || { top: 0 };
	}
});

router.beforeEach((to, from, next) => {
	next();
});

app.use(router);
app.mount('#app');
