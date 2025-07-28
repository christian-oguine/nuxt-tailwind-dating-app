<template>
    <header class="py-4 border-b">
        <nav class="flex container items-center justify-between">
            <!-- Logo Section (Left) -->
            <div class="flex items-center gap-3">
                <NuxtImg width="50" densities="1x" format="webp" src="/icon-green.png" alt="Logo" />
                <div class="font-bold">Nuxt Dating App</div>
            </div>

            <!-- Navigation Links (Center) -->
            <ul class="flex gap-6 items-center">
                <li><NuxtLink to="/" class="text-gray-700 hover:text-blue-500">Home</NuxtLink></li>
                <li><NuxtLink to="/about" class="text-gray-700 hover:text-blue-500">About</NuxtLink></li>
                <li><NuxtLink to="/contact" class="text-gray-700 hover:text-blue-500">Contact</NuxtLink></li>
            </ul>

            <!-- Icons Section (Right) -->

            <div class="flex items-center gap-3">
                <!-- Search Icon -->
                <button class="p-2 text-gray-700 hover:text-primary transition-colors" title="Search">
                    <Icon name="heroicons:magnifying-glass" class="w-6 h-6" />
                </button>

                <!-- Social Media Icons -->
                <div class="flex items-center gap-2 border-l pl-3">
                    <!-- Messages/Chat Icon -->
                    <button class="relative p-2 text-gray-700 hover:text-primary transition-colors" title="Messages">
                        <Icon name="heroicons:chat-bubble-left-ellipsis" class="w-6 h-6" />
                        <!-- New message badge -->
                        <span class="absolute -top-1 -right-1 bg-success text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">5</span>
                    </button>

                    <!-- Likes/Hearts Icon -->
                    <button class="relative p-2 text-gray-700 hover:text-danger transition-colors" title="Likes">
                        <Icon name="heroicons:heart" class="w-6 h-6" />
                        <span class="absolute -top-1 -right-1 bg-danger text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
                    </button>

                    <!-- Matches Icon -->
                    <button class="p-2 text-gray-700 hover:text-secondary transition-colors" title="Matches">
                        <Icon name="heroicons:sparkles" class="w-6 h-6" />
                    </button>
                </div>

                <!-- Notifications/Alert Icon -->
                <button class="relative p-2 text-gray-700 hover:text-primary transition-colors border-l pl-3" title="Notifications">
                    <Icon name="heroicons:bell" class="w-6 h-6" />
                    <!-- Notification badge -->
                    <span class="absolute -top-1 -right-1 bg-warning text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                </button>

                <!-- Language Switcher -->
                <button class="p-2 text-gray-700 hover:text-primary transition-colors" title="Change Language">
                    <Icon name="heroicons:language" class="w-6 h-6" />
                </button>

                <!-- Profile Icon -->
                <button class="p-2 text-gray-700 hover:text-primary transition-colors" title="Profile">
                    <Icon name="heroicons:user-circle" class="w-7 h-7" />
                </button>

                <!-- Menu Icon (Dropdown) -->
                <button class="p-2 text-gray-700 hover:text-primary transition-colors" title="Menu">
                    <Icon name="heroicons:bars-3" class="w-6 h-6" />
                </button>
            </div>
        </nav>
    </header>
</template>
<script lang="ts" setup>    
</script>