<script setup lang="ts">
import type { NuxtError } from '#app'

defineProps({
    error: Object as () => NuxtError
})


</script>

<template>
  <div class="min-h-screen bg-gray-50 flex  justify-center px-10 py-20">
    <div class="max-w-md w-full text-center">
      <!-- Error Icon -->
      <div class="mb-6">
        <Icon name="heroicons:exclamation-triangle" class="w-16 h-16 text-red-500 mx-auto" />
      </div>
      
      <!-- Error Title -->
      <h1 class="text-3xl font-bold text-gray-900 mb-4">
        {{ error?.statusCode || 404 }}
      </h1>
      
      <!-- Error Message -->
      <p class="text-xl text-gray-600 mb-8">
        {{ error?.statusMessage || 'Something went wrong' }}
      </p>
      
      <!-- Action Buttons -->
      <div class="space-y-4">
        <button 
          @click="clearError({ redirect: '/' })"
          class="w-full  bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium"
        >
          Go Home
        </button>
        
        <button 
          @click="clearError()"
          class="w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
        >
          Try Again
        </button>
      </div>
    </div>
  </div>
</template>

