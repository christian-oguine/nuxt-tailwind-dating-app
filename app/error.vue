<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50">
    <div class="max-w-md w-full text-center">
      <h1 class="text-6xl font-bold text-gray-900 mb-4">{{ error.statusCode }}</h1>
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">
        {{ error.statusCode === 404 ? 'Page Not Found' : 'Something went wrong' }}
      </h2>
      <p class="text-gray-600 mb-8">{{ error.message }}</p>
      <div class="space-y-4">
        <button 
          @click="handleError" 
          class="w-full bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Try Again
        </button>
        <a 
          href="/" 
          class="block w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Go Home
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  error: Object
})

const handleError = () => clearError({ redirect: '/' })
</script>
