<template>
	<div id="app">
		<nav class="bg-white shadow-sm">
			<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div class="flex justify-between h-16">
					<div class="flex">
						<router-link
							to="/"
							class="flex-shrink-0 flex items-center">
							<span class="text-xl font-bold text-indigo-600">Bravabook</span>
						</router-link>
						<div class="hidden sm:ml-6 sm:flex sm:space-x-8">
							<router-link
								to="/"
								class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
								active-class="border-indigo-500 text-gray-900"
								exact>
								Home
							</router-link>
						</div>
					</div>
					<div class="hidden sm:ml-6 sm:flex sm:items-center">
						<router-link to="/admin/apartments" class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium" active-class="bg-gray-100 text-gray-900">Apartments</router-link>
						<router-link to="/admin/bookings" class="text-gray-500 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium" active-class="bg-gray-100 text-gray-900">Bookings</router-link>
					</div>
				</div>
			</div>
		</nav>

		<main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<router-view v-slot="{ Component }">
				<transition
					name="fade"
					mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</main>
	</div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
	transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
	opacity: 0;
}
</style>
