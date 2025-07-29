<script setup lang="ts">
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

const { id } = useRoute().params;

const { data, error, pending } = await useFetch<UsersData>(`/users.json`);

if (error.value) {
  throw createError({
    statusCode: 500,
    statusMessage: 'Failed to load data'
  });
}

const user = computed(() => {
  if (!data.value?.users) return null;
  const foundUser = data.value.users.find(u => u.id === parseInt(id as string));
  
  // If data is loaded but no user found, throw 404
  if (data.value?.users && !foundUser && !pending.value) {
    throw createError({
      statusCode: 404,
      statusMessage: 'User not found'
    });
  }
  
  return foundUser;
});

useSeoMeta({
  title: computed(() => user.value ? `${user.value.firstName} ${user.value.lastName}, ${user.value.age} - Dating Profile | Nuxt Dating App` : 'User Profile - Nuxt Dating App'),
  description: computed(() => user.value ? `Meet ${user.value.firstName}, ${user.value.age} years old from ${user.value.address.city}, ${user.value.address.country}. ${user.value.bio || `Connect with ${user.value.firstName} and start your dating journey today!`}` : 'Find your perfect match on Nuxt Dating App'),
  ogTitle: computed(() => user.value ? `${user.value.firstName} ${user.value.lastName} - Dating Profile` : 'User Profile'),
  ogDescription: computed(() => user.value ? `${user.value.firstName}, ${user.value.age} from ${user.value.address.city}. Join our dating community and connect!` : 'Find love and meaningful connections'),
  ogImage: computed(() => user.value?.image || '/og-image.jpg'),
  ogUrl: computed(() => `http://lodalhost:3003/users/${id}`),
  twitterTitle: computed(() => user.value ? `${user.value.firstName} ${user.value.lastName} - Dating Profile` : 'User Profile'),
  twitterDescription: computed(() => user.value ? `Meet ${user.value.firstName} on our dating platform` : 'Find your perfect match'),
  twitterImage: computed(() => user.value?.image || '/twitter-image.jpg'),
  twitterCard: 'summary_large_image'
})

// Generate random data for demo
const getRandomData = () => ({
  photos: Math.floor(Math.random() * 15) + 5,
  likes: Math.floor(Math.random() * 5000) + 100,
  views: Math.floor(Math.random() * 10000) + 500,
  matches: Math.floor(Math.random() * 200) + 50,
  lastSeen: Math.floor(Math.random() * 72) + 1,
  isOnline: Math.random() > 0.4,
  isBoosted: Math.random() > 0.7,
  isVerified: Math.random() > 0.5,
  interests: [
    'Travel', 'Photography', 'Cooking', 'Fitness', 'Music', 'Reading', 
    'Movies', 'Dancing', 'Hiking', 'Art', 'Gaming', 'Yoga'
  ].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 6) + 3),
  languages: ['English', 'Spanish', 'French', 'German', 'Italian'].sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1),
  education: ['High School', 'Bachelor\'s Degree', 'Master\'s Degree', 'PhD'][Math.floor(Math.random() * 4)],
  occupation: ['Software Engineer', 'Teacher', 'Designer', 'Doctor', 'Marketing Manager', 'Chef', 'Artist', 'Fitness Trainer'][Math.floor(Math.random() * 8)],
  relationshipGoal: ['Serious Relationship', 'Casual Dating', 'Friends First', 'Not Sure Yet'][Math.floor(Math.random() * 4)],
  height: `${Math.floor(Math.random() * 20) + 160}cm`,
  zodiac: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces'][Math.floor(Math.random() * 12)]
})

const randomData = getRandomData()
</script>

<template>
  <main class="min-h-screen bg-gray-50">
    <!-- Loading State -->
    <div v-if="pending" class="flex justify-center items-center min-h-screen">
      <div class="text-center">
        <Icon name="heroicons:heart" class="w-12 h-12 text-primary mx-auto animate-pulse mb-4" />
        <p class="text-neutral">Loading profile for ID: {{ id }}...</p>
      </div>
    </div>

    <!-- Profile Content -->
    <div v-else-if="user" class="container mx-auto px-4 py-8 max-w-6xl">
      <!-- Back Button -->
      <div class="mb-6">
        <button @click="$router.back()" class="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
          <Icon name="heroicons:arrow-left" class="w-5 h-5" />
          Back to profiles
        </button>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Left Column - Main Profile -->
        <div class="lg:col-span-2 space-y-6">
          <!-- Profile Header -->
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <!-- Main Photo -->
            <div class="relative h-96">
              <NuxtImg 
                :src="user.image" 
                :alt="`${user.firstName} ${user.lastName}`"
                class="w-full h-full object-cover"
                sizes="lg:800px md:600px sm:400px"
                format="webp"
              />
              
              <!-- Status Overlays -->
              <div class="absolute top-4 left-4 flex gap-2">
                <div v-if="randomData.isOnline" class="bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm">
                  <div class="w-2 h-2 bg-white rounded-full"></div>
                  Online now
                </div>
                <div v-else class="bg-gray-600 text-white px-3 py-1 rounded-full text-sm">
                  Last seen {{ randomData.lastSeen }}h ago
                </div>
              </div>

              <div class="absolute top-4 right-4 flex gap-2">
                <div v-if="randomData.isVerified" class="bg-blue-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                  <Icon name="heroicons:check-badge" class="w-4 h-4" />
                  Verified
                </div>
                <div v-if="randomData.isBoosted" class="bg-orange-500 text-white px-3 py-1 rounded-full flex items-center gap-1 text-sm">
                  <Icon name="mdi:fire" class="w-4 h-4" />
                  Boosted
                </div>
              </div>

              <!-- Photo Count -->
              <div class="absolute bottom-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full flex items-center gap-1">
                <Icon name="heroicons:camera" class="w-4 h-4" />
                <span class="text-sm">{{ randomData.photos }} photos</span>
              </div>
            </div>

            <!-- Profile Info -->
            <div class="p-6">
              <div class="flex items-start justify-between mb-4">
                <div>
                  <h1 class="text-3xl font-bold text-gray-900 mb-2">
                    {{ user.firstName }} {{ user.lastName }}
                    <span class="text-2xl text-gray-600 font-normal">, {{ user.age }}</span>
                  </h1>
                  <div class="flex items-center gap-2 text-gray-600 mb-2">
                    <Icon name="heroicons:map-pin" class="w-5 h-5" />
                    <span>{{ user.address.city }}, {{ user.address.country }}</span>
                  </div>
                  <div class="flex items-center gap-4 text-sm text-gray-600">
                    <span>{{ randomData.height }}</span>
                    <span>{{ randomData.zodiac }}</span>
                    <span>{{ user.gender === 'male' ? 'Male' : 'Female' }}</span>
                  </div>
                </div>
              </div>

              <!-- Bio -->
              <div class="mb-6">
                <h3 class="text-lg font-semibold mb-2">About {{ user.firstName }}</h3>
                <p class="text-gray-700 leading-relaxed">
                  {{ user.bio || `Hi! I'm ${user.firstName}. I love meeting new people and exploring new places. Looking forward to connecting with someone special who shares similar interests and values.` }}
                </p>
              </div>

              <!-- Stats Row -->
              <div class="grid grid-cols-3 gap-4 py-4 border-t border-gray-200">
                <div class="text-center">
                  <div class="flex items-center justify-center gap-1 text-red-500 mb-1">
                    <Icon name="mdi:thumb-up" class="w-5 h-5" />
                  </div>
                  <div class="text-2xl font-bold text-gray-900">{{ randomData.likes.toLocaleString() }}</div>
                  <div class="text-sm text-gray-600">Likes</div>
                </div>
                <div class="text-center">
                  <div class="flex items-center justify-center gap-1 text-purple-500 mb-1">
                    <Icon name="mdi:eye" class="w-5 h-5" />
                  </div>
                  <div class="text-2xl font-bold text-gray-900">{{ randomData.views.toLocaleString() }}</div>
                  <div class="text-sm text-gray-600">Views</div>
                </div>
                <div class="text-center">
                  <div class="flex items-center justify-center gap-1 text-green-500 mb-1">
                    <Icon name="heroicons:heart" class="w-5 h-5" />
                  </div>
                  <div class="text-2xl font-bold text-gray-900">{{ randomData.matches }}</div>
                  <div class="text-sm text-gray-600">Matches</div>
                </div>
              </div>
            </div>
          </div>

          <!-- Interests Section -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="heroicons:star" class="w-5 h-5 text-yellow-500" />
              Interests
            </h3>
            <div class="flex flex-wrap gap-2">
              <span v-for="interest in randomData.interests" :key="interest" 
                class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                {{ interest }}
              </span>
            </div>
          </div>

          <!-- Details Section -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-xl font-semibold mb-4 flex items-center gap-2">
              <Icon name="heroicons:information-circle" class="w-5 h-5 text-blue-500" />
              Details
            </h3>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div class="flex items-center gap-3">
                <Icon name="heroicons:academic-cap" class="w-5 h-5 text-gray-500" />
                <div>
                  <div class="text-sm text-gray-600">Education</div>
                  <div class="font-medium">{{ randomData.education }}</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <Icon name="heroicons:briefcase" class="w-5 h-5 text-gray-500" />
                <div>
                  <div class="text-sm text-gray-600">Occupation</div>
                  <div class="font-medium">{{ randomData.occupation }}</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <Icon name="heroicons:heart" class="w-5 h-5 text-gray-500" />
                <div>
                  <div class="text-sm text-gray-600">Looking for</div>
                  <div class="font-medium">{{ randomData.relationshipGoal }}</div>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <Icon name="heroicons:language" class="w-5 h-5 text-gray-500" />
                <div>
                  <div class="text-sm text-gray-600">Languages</div>
                  <div class="font-medium">{{ randomData.languages.join(', ') }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column - Actions & Quick Info -->
        <div class="space-y-6">
          <!-- Action Buttons -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Connect with {{ user.firstName }}</h3>
            <div class="space-y-3">
              <!-- Like Button -->
              <button class="w-full bg-red-500 hover:bg-red-600 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Icon name="mdi:thumb-up" class="w-5 h-5" />
                Like Profile
              </button>
              
              <!-- Message Button -->
              <button class="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Icon name="mdi:chat" class="w-5 h-5" />
                Send Message
              </button>
              
              <!-- Send Gift Button -->
              <button class="w-full bg-pink-500 hover:bg-pink-600 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Icon name="mdi:gift" class="w-5 h-5" />
                Send Gift
              </button>
              
              <!-- Save Profile Button -->
              <button class="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Icon name="mdi:bookmark" class="w-5 h-5" />
                Save Profile
              </button>
            </div>
          </div>

          <!-- Quick Stats -->
          <div class="bg-white rounded-lg shadow-lg p-6">
            <h3 class="text-lg font-semibold mb-4">Quick Info</h3>
            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Age</span>
                <span class="font-medium">{{ user.age }} years old</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Location</span>
                <span class="font-medium">{{ user.address.city }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Height</span>
                <span class="font-medium">{{ randomData.height }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Sign</span>
                <span class="font-medium">{{ randomData.zodiac }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-gray-600">Photos</span>
                <span class="font-medium">{{ randomData.photos }}</span>
              </div>
            </div>
          </div>

          <!-- Safety Tips -->
          <div class="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div class="flex items-start gap-3">
              <Icon name="heroicons:shield-check" class="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 class="font-medium text-yellow-800 mb-1">Stay Safe</h4>
                <p class="text-sm text-yellow-700">
                  Always meet in public places and trust your instincts when dating online.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

