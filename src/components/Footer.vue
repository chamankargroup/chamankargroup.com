<template>
  <footer class="bg-gray-900 text-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Company Info -->
        <div>
          <h3 class="text-xl font-bold mb-4 text-primary-400">CHAMANKAR GROUP</h3>
          <p class="text-gray-400 text-sm">
            A trusted name in the construction industry for over 25 years, building quality residential, commercial, and government projects across Mumbai.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-xl font-bold mb-4">Quick Links</h3>
          <ul class="space-y-2">
            <li><router-link to="/" class="text-gray-400 hover:text-primary-400 text-sm transition-colors">Home</router-link></li>
            <li><router-link to="/about" class="text-gray-400 hover:text-primary-400 text-sm transition-colors">About Us</router-link></li>
            <li><router-link to="/projects" class="text-gray-400 hover:text-primary-400 text-sm transition-colors">Projects</router-link></li>
            <li><router-link to="/contact" class="text-gray-400 hover:text-primary-400 text-sm transition-colors">Contact</router-link></li>
          </ul>
        </div>

        <!-- Contact Info -->
        <div>
          <h3 class="text-xl font-bold mb-4">Contact Us</h3>
          <ul class="space-y-2 text-sm text-gray-400">
            <li>Mumbai, Maharashtra, India</li>
            <li>Email: info@chamankargroup.com</li>
            <li>Phone: +91 22 XXXX XXXX</li>
          </ul>
        </div>
      </div>

      <div class="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
        <p>&copy; {{ new Date().getFullYear() }} Chamankar Group. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
</style>
