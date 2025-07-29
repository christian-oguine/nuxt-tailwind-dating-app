<script setup lang="ts">
// Disable SSR for this page to prevent router errors
definePageMeta({
  ssr: false
})

// Define the User interface
interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  image: string;
  bio?: string;
  address: {
    city: string;
    country: string;
  };
}

interface UsersData {
  users: User[];
}

// Fallback data in case local file fails
const fallbackUsers: User[] = [
  {
    id: 1,
    firstName: "Sarah",
    lastName: "Johnson", 
    age: 25,
    gender: "female",
    image: "/1.jpg",
    bio: "Love hiking and good coffee",
    address: { city: "New York", country: "United States" }
  }
];

// Use reactive ref for better SSR compatibility
const users = ref<User[]>(fallbackUsers);
const currentPage = ref(1);
const usersPerPage = 8; // Show 8 users per page (2 rows on desktop)

// Computed properties for pagination
const totalUsers = computed(() => users.value.length);
const totalPages = computed(() => Math.ceil(totalUsers.value / usersPerPage));
const paginatedUsers = computed(() => {
  const start = (currentPage.value - 1) * usersPerPage;
  const end = start + usersPerPage;
  return users.value.slice(start, end);
});

// Pagination methods
const goToPage = (page: number) => {
  currentPage.value = page;
  // Scroll to top of profiles section
  document.querySelector('#profiles-section')?.scrollIntoView({ behavior: 'smooth' });
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    goToPage(currentPage.value + 1);
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    goToPage(currentPage.value - 1);
  }
};

// Client-side data loading to avoid SSR issues
onMounted(async () => {
  try {
    const usersData = await $fetch<UsersData>('/users.json');
    if (usersData && usersData.users) {
      users.value = usersData.users;
    }
  } catch (error) {
    console.log("Using fallback data:", error);
    // Keep fallback data
  }
});

useHead({
  htmlAttrs: {
    lang: 'en'
  },
  link: [
    {
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }
  ]
})

useSeoMeta({
  title: 'Find Your Perfect Match - Nuxt Dating App | Connect with Singles',
  description: computed(() => `Discover meaningful connections on Nuxt Dating App. Browse ${totalUsers.value} verified singles, chat securely, and find your perfect match. Join thousands of users finding love every day!`),
  ogTitle: 'Nuxt Dating App - Where Love Begins',
  ogDescription: 'Join the best dating platform to meet singles in your area. Safe, secure, and designed for meaningful relationships.',
  ogImage: '/people.jpg',
  ogUrl: 'https://yourdomain.com/',
  twitterTitle: 'Find Love on Nuxt Dating App',
  twitterDescription: 'Connect with verified singles and start your love story today. Join thousands finding meaningful relationships!',
  twitterImage: '/people.jpg',
  twitterCard: 'summary_large_image'
})
</script>


<template>
  <main>
    <section class="bg-#f1f1f1 p-6">
      <div class="container flex flex-col lg:flex-row items-center py-20 gap-10">
        <div class="flex-1">
          <h1 class="text-4xl font-bold mb-4">Welcome to the Nuxt Dating App</h1>
          <p class="text-lg text-neutral font-inter mb-6">Connect with like-minded individuals and find your perfect match.</p>
          <a href="/about" class="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 transition-colors inline-block">Learn More</a>
        </div>
        <div class="flex-1 order-1 lg:order-2">
          <NuxtImg sizes="xs:100vw sm:667px lg:800px" densities="1x" src="/people.jpg" alt="Dating App Hero Image" />
        </div>
    
      </div>
    </section>

    <!-- <section class="container py-10">
      <h2 class="text-3xl font-bold mb-6">Featured Users</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="user in data.users" :key="user.id" class="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow">
          <NuxtImg :src="user.image" alt="User Image" class="w-full h-48 object-cover rounded mb-4" />
          <h3 class="text-xl font-semibold">{{ user.firstName }} {{ user.lastName }}</h3>
          <p class="text-neutral font-inter mt-2">{{ user.email }}</p>
        </div>
      </div>
    </section> -->

    <section id="profiles-section" class="container py-10">
      <h2 class="text-3xl lg:text-5xl font-bold mb-6">Discover Your Perfect Match</h2>
      <p class="text-lg text-neutral font-inter mb-6">Join our community of singles and start connecting today!</p>
      
      <!-- Profile Stats -->
      <div class="flex items-center justify-between mb-6">
        <p class="text-sm text-gray-600">
          Showing {{ ((currentPage - 1) * usersPerPage) + 1 }}-{{ Math.min(currentPage * usersPerPage, totalUsers) }} of {{ totalUsers }} profiles
        </p>
        <p class="text-sm text-gray-600">
          Page {{ currentPage }} of {{ totalPages }}
        </p>
      </div>
      
      <!-- Loading State -->
      <div v-if="!paginatedUsers.length" class="flex justify-center items-center py-20">
        <div class="text-center">
          <Icon name="heroicons:heart" class="w-12 h-12 text-primary mx-auto animate-pulse mb-4" />
          <p class="text-neutral">Finding your perfect matches...</p>
        </div>
      </div>

      <!-- Profiles Grid - Responsive: 2 on mobile, 3 on tablet, 4 on laptop -->
      <div v-else class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="user in paginatedUsers" :key="user.id" class="flex flex-col bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow">
          <div class="relative">
            <NuxtImg :src="user.image" sizes="xs:100vw sm:50vw lg:300px" densities="1x" format="webp" :alt="`${user.firstName} ${user.lastName}`" class="w-full h-64 object-cover" />
            <!-- Photos count overlay -->
            <div class="absolute top-3 right-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full flex items-center gap-1">
              <Icon name="heroicons:camera" class="w-4 h-4" />
              <span class="text-xs">{{ Math.floor(Math.random() * 10) + 3 }}</span>
            </div>
            <!-- Online status (random) -->
            <div v-if="Math.random() > 0.3" class="absolute top-3 left-3 bg-success text-white px-2 py-1 rounded-full flex items-center gap-1">
              <div class="w-2 h-2 bg-white rounded-full"></div>
              <span class="text-xs">Online</span>
            </div>
          </div>
          
          <div class="p-4">
            <!-- Name, Age, Gender -->
            <div class="flex items-center justify-between mb-2">
              <div class="flex items-center gap-2">
                <h3 class="text-xl font-semibold text-dark">{{ user.firstName }} {{ user.lastName }}</h3>
                <!-- Boosted Status (random for some users) -->
                <span v-if="Math.random() > 0.7" class="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full flex items-center gap-1">
                  <Icon name="mdi:fire" class="w-3 h-3" />
                  Boosted
                </span>
              </div>
            </div>

            <!-- Age and Gender -->
            <p class="text-neutral font-inter text-sm mb-3">{{ user.age }}, {{ user.gender === 'male' ? 'M' : 'F' }}</p>
            
            <!-- Location with icon -->
            <div class="flex items-center gap-2 mb-3">
              <Icon name="heroicons:map-pin" class="w-4 h-4 text-neutral" />
              <span class="text-sm text-neutral">{{ user.address?.city }}, {{ user.address?.country }}</span>
            </div>
            
            <!-- Stats Row -->
            <div class="flex items-center justify-between py-3 border-y border-gray-100">
              <!-- Likes Count -->
              <div class="flex items-center gap-1">
                <Icon name="mdi:thumb-up" class="w-4 h-4 text-red-500" />
                <span class="text-sm font-medium">{{ Math.floor(Math.random() * 5000) + 100 }} likes</span>
              </div>
              
              <!-- Views Count -->
              <div class="flex items-center gap-1">
                <Icon name="mdi:eye" class="w-4 h-4 text-purple-500" />
                <span class="text-sm font-medium">{{ Math.floor(Math.random() * 10000) + 500 }} views</span>
              </div>
              
              <!-- Last seen -->
              <div class="text-xs text-neutral">
                {{ Math.floor(Math.random() * 24) + 1 }}h ago
              </div>
            </div>
            
            <!-- View Profile Button -->
            <div class="mt-4">
              <NuxtLink :to="`/users/${user.id}`" class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Icon name="heroicons:eye" class="w-4 h-4" />
                View Profile
              </NuxtLink>
            </div>
            
            <!-- Action Buttons -->
            <div class="flex items-center justify-between pt-4">
              <!-- Like Button -->
              <button class="p-3 bg-red-50 rounded-full hover:bg-red-100 transition-colors" title="Like">
                <Icon name="mdi:thumb-up" class="w-5 h-5 text-red-500" />
              </button>

              <!-- Chat/Message Button -->
              <button class="p-3 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors" title="Message">
                <Icon name="mdi:chat" class="w-5 h-5 text-blue-500" />
              </button>

              <!-- Send Gift Button -->
              <button class="p-3 bg-pink-50 rounded-full hover:bg-pink-100 transition-colors" title="Send Gift">
                <Icon name="mdi:gift" class="w-5 h-5 text-pink-500" />
              </button>

              <!-- Save/Bookmark Profile Button -->
              <button class="p-3 bg-yellow-50 rounded-full hover:bg-yellow-100 transition-colors" title="Save Profile">
                <Icon name="mdi:bookmark" class="w-5 h-5 text-yellow-600" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Pagination Controls -->
      <div v-if="totalPages > 1" class="flex items-center justify-center mt-12 space-x-2">
        <!-- Previous Button -->
        <button 
          @click="prevPage" 
          :disabled="currentPage === 1"
          class="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          <Icon name="heroicons:chevron-left" class="w-4 h-4 mr-1" />
          Previous
        </button>
        
        <!-- Page Numbers -->
        <div class="flex space-x-1">
          <!-- First page -->
          <button 
            v-if="currentPage > 3"
            @click="goToPage(1)"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700 transition-colors"
          >
            1
          </button>
          
          <!-- Ellipsis -->
          <span v-if="currentPage > 4" class="px-3 py-2 text-sm font-medium text-gray-500">...</span>
          
          <!-- Previous page -->
          <button 
            v-if="currentPage > 1"
            @click="goToPage(currentPage - 1)"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700 transition-colors"
          >
            {{ currentPage - 1 }}
          </button>
          
          <!-- Current page -->
          <button 
            class="px-3 py-2 text-sm font-medium text-white bg-blue-500 border border-blue-500 cursor-default"
          >
            {{ currentPage }}
          </button>
          
          <!-- Next page -->
          <button 
            v-if="currentPage < totalPages"
            @click="goToPage(currentPage + 1)"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700 transition-colors"
          >
            {{ currentPage + 1 }}
          </button>
          
          <!-- Ellipsis -->
          <span v-if="currentPage < totalPages - 3" class="px-3 py-2 text-sm font-medium text-gray-500">...</span>
          
          <!-- Last page -->
          <button 
            v-if="currentPage < totalPages - 2"
            @click="goToPage(totalPages)"
            class="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 hover:bg-gray-50 hover:text-gray-700 transition-colors"
          >
            {{ totalPages }}
          </button>
        </div>
        
        <!-- Next Button -->
        <button 
          @click="nextPage" 
          :disabled="currentPage === totalPages"
          class="flex items-center px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-50 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <Icon name="heroicons:chevron-right" class="w-4 h-4 ml-1" />
        </button>
      </div>
      
      <!-- Page Jump -->
      <div v-if="totalPages > 5" class="flex items-center justify-center mt-6">
        <div class="flex items-center space-x-2">
          <span class="text-sm text-gray-600">Jump to page:</span>
          <select 
            v-model="currentPage" 
            @change="goToPage(currentPage)"
            class="px-3 py-1 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option v-for="page in totalPages" :key="page" :value="page">
              {{ page }}
            </option>
          </select>
        </div>
      </div>
    </section>
  </main> 
</template>

