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
                <li><a href="/" class="text-gray-700 hover:text-blue-500">Home</a></li>
                <li><a href="/about" class="text-gray-700 hover:text-blue-500">About</a></li>
                <li><a href="/contact" class="text-gray-700 hover:text-blue-500">Contact</a></li>
            </ul>

            <!-- Icons Section (Right) -->
            <div class="flex items-center gap-2">
                <!-- Search Icon -->
                <button class="p-2 text-gray-700 hover:text-primary transition-colors rounded-lg" title="Search">
                    <Icon name="heroicons:magnifying-glass" class="w-5 h-5" />
                </button>

                <!-- Dating App Icons Group -->
                <div class="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
                    <!-- Messages/Chat Icon -->
                    <button class="relative p-2 text-gray-700 hover:text-primary transition-colors rounded-md" title="Messages">
                        <Icon name="heroicons:chat-bubble-left-ellipsis" class="w-5 h-5" />
                        <span class="absolute -top-1 -right-1 bg-success text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">5</span>
                    </button>

                    <!-- Matches Icon -->
                    <button class="p-2 text-gray-700 hover:text-secondary transition-colors rounded-md" title="Matches">
                        <Icon name="heroicons:sparkles" class="w-5 h-5" />
                    </button>

                    <!-- Notifications Icon -->
                    <button class="relative p-2 text-gray-700 hover:text-primary transition-colors rounded-md" title="Notifications">
                        <Icon name="heroicons:bell" class="w-5 h-5" />
                        <span class="absolute -top-1 -right-1 bg-warning text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">3</span>
                    </button>
                </div>

                <!-- User Controls Group -->
                <div class="flex items-center gap-1 bg-gray-50 rounded-lg p-1">
                    <!-- Language Switcher -->
                    <button class="p-2 text-gray-700 hover:text-primary transition-colors rounded-md" title="Change Language">
                        <Icon name="heroicons:language" class="w-5 h-5" />
                    </button>

                    <!-- Profile Icon -->
                    <button class="p-2 text-gray-700 hover:text-primary transition-colors rounded-md" title="Profile">
                        <Icon name="heroicons:user-circle" class="w-6 h-6" />
                    </button>

                    <!-- Menu Icon (Dropdown) -->
                    <button class="p-2 text-gray-700 hover:text-primary transition-colors rounded-md" title="Menu">
                        <Icon name="heroicons:bars-3" class="w-5 h-5" />
                    </button>
                </div>
            </div>
        </nav>
    </header>
</template>
<script lang="ts" setup>    
</script>