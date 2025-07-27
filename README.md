# 💕 Nuxt Tailwind Dating App

A demo dating app UI built with Nuxt 4 and Tailwind CSS to showcase a modern, responsive dating platform design. This project focuses on clean layout, mobile-first responsiveness.

## 🚀 Installation & Setup

### Prerequisites

- **Node.js** (v16.10.0 or later)
- **npm** (v7 or later) or **yarn** or **pnpm**
- **Git**

### 📦 Clone & Install

```bash
# Clone the repository
git clone https://github.com/christian-oguine/nuxt-tailwind-dating-app.git
cd nuxt-tailwind-dating-app

# Install dependencies
npm install
```

## 🔧 Modules Installed & Configuration

### 1. **@nuxtjs/tailwindcss** - CSS Framework
```bash
npm install @nuxtjs/tailwindcss
```

**What it does:** Integrates Tailwind CSS with Nuxt.js for utility-first styling
**Why we need it:** Provides rapid UI development with pre-built CSS classes
**Auto-configured in:** `nuxt.config.ts`

### 2. **@nuxtjs/google-fonts** - Font Management
```bash
npm install @nuxtjs/google-fonts
```

**What it does:** Automatically loads Google Fonts with optimization
**Why we need it:** Loads custom fonts (Montserrat, Inter, Poppins) efficiently
**Configuration:** Font families are loaded automatically based on Tailwind config

### 3. **@nuxt/icon** - Icon System
```bash
npm install @nuxt/icon
```

**What it does:** Provides 100k+ icons from various icon sets
**Why we need it:** Essential for dating app UI (hearts, matches, profiles, etc.)

### 4. **@nuxt/image** - Image Optimization
```bash
npm install @nuxt/image
```

**What it does:** Automatic image optimization and responsive images
**Why we need it:** Critical for profile photos and app performance

## ⚙️ Configuration Files

### 1. **tailwind.config.js** - Tailwind Customization

**Location:** `./tailwind.config.js`
**Purpose:** Customize Tailwind CSS for dating app theme

```javascript
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue", 
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./composables/**/*.{js,ts}",
    "./utils/**/*.{js,ts}",
    "./app.vue",
    "./error.vue"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#f43f5e',     // Rose pink - romantic and passionate
        secondary: '#a855f7',   // Purple - elegant and mysterious
        accent: '#ff6b6b',      // Coral - warm and friendly
        neutral: '#64748b',     // Slate gray - for text
        success: '#10b981',     // Green - for positive actions
        warning: '#f59e0b',     // Amber - for notifications
        danger: '#ef4444',      // Red - for errors/warnings
        light: '#f8fafc',       // Very light gray - backgrounds
        dark: '#1e293b'         // Dark slate - dark text
      },
      fontFamily: { 
        'montserrat': ['Montserrat', 'sans-serif'],  // Headings
        'inter': ['Inter', 'system-ui', 'sans-serif'],  // Body text, buttons
        'poppins': ['Poppins', 'sans-serif'],         // Alternative headings
      },
      container: {
        center: true,
        padding: '2rem',
      },
    },
  },
  plugins: [],
}
```

**Key Features:**
- **Content Array:** Tells Tailwind which files to scan for CSS classes
- **Custom Colors:** Dating app specific color palette for romantic feel
- **Font Families:** Three complementary fonts for different UI elements
- **Container:** Centered layouts with consistent padding

### 2. **VS Code Settings** - Development Experience

**Location:** `.vscode/settings.json`
**Purpose:** Enable Tailwind CSS IntelliSense for better development

```json
{
    "tailwindCSS.includeLanguages": {
        "vue": "html"
    },
    "editor.quickSuggestions": {
        "strings": true
    }
}
```

**What it does:**
- **tailwindCSS.includeLanguages:** Enables Tailwind autocomplete in Vue files
- **editor.quickSuggestions:** Shows CSS suggestions when typing in class attributes

**Why it's important:** Provides autocomplete for custom colors and fonts while coding

## 🎨 Theme Usage Examples

```vue
<template>
  <!-- Primary button with custom font -->
  <button class="bg-primary text-white font-montserrat font-semibold px-6 py-3 rounded-lg">
    Find Your Match
  </button>
  
  <!-- Card with custom colors -->
  <div class="bg-light border border-primary/20 rounded-xl p-6">
    <h2 class="text-dark font-montserrat text-xl font-bold">Profile</h2>
    <p class="text-neutral font-inter">Connect with meaningful people</p>
  </div>
  
  <!-- Success notification -->
  <div class="bg-success text-white p-4 rounded-lg">
    It's a match! 💕
  </div>
</template>
```

## 🏃‍♂️ Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 🛠️ VS Code Setup (Recommended)

**Required Extensions:**
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

**Features enabled:**
- Tailwind class autocomplete with color previews
- Custom color suggestions (`bg-primary`, `text-secondary`, etc.)
- Font family autocomplete (`font-montserrat`, `font-inter`)

## 📱 Testing Your Setup

To verify everything works:

1. **Start development server:** `npm run dev`
2. **Check styling:** Visit `http://localhost:3000` - you should see styled content
3. **Test autocomplete:** In VS Code, type `class="bg-` and verify suggestions appear
4. **Custom colors work:** Type `bg-primary` and see the rose pink color preview

## 🎯 What's Configured

✅ **Nuxt 4** - Latest framework version  
✅ **Tailwind CSS** - Utility-first styling with custom theme  
✅ **Google Fonts** - Montserrat, Inter, Poppins loaded automatically  
✅ **Icon System** - 100k+ icons available  
✅ **Image Optimization** - Automatic responsive images  
✅ **VS Code IntelliSense** - Autocomplete for all custom classes  
✅ **Custom Color Palette** - Dating app themed colors  
✅ **Typography Scale** - Three complementary font families  

## 🚨 Troubleshooting

**Tailwind not working?**
- Restart dev server: `npm run dev`
- Check file paths in `tailwind.config.js`

**No autocomplete in VS Code?**
- Install Tailwind CSS IntelliSense extension
- Reload VS Code window (Ctrl+Shift+P → "Developer: Reload Window")

**Custom colors not showing?**
- Verify `tailwind.config.js` syntax
- Check `.vscode/settings.json` exists
