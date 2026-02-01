<template>
  <div>
    <!-- Navigation -->
    <nav
      class="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      :class="scrolled ? 'bg-sand-light/95 backdrop-blur-lg py-4' : 'bg-transparent py-7'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <!-- Logo -->
        <router-link to="/" class="font-display text-xl sm:text-2xl lg:text-3xl font-medium text-text-dark">
          Chamankar Group
        </router-link>

        <!-- Desktop Navigation -->
        <ul class="hidden lg:flex items-center gap-8 xl:gap-10">
          <li v-for="link in navLinks" :key="link.path">
            <router-link
              :to="link.path"
              class="text-sm font-normal text-text-medium hover:text-clay transition-colors"
              active-class="!text-clay"
            >
              {{ link.name }}
            </router-link>
          </li>
        </ul>

        <!-- Desktop CTA -->
        <router-link
          to="/contact"
          class="hidden lg:inline-block px-6 xl:px-7 py-3 bg-earth text-white text-sm font-medium rounded-full hover:bg-clay transition-all"
        >
          Get in Touch
        </router-link>

        <!-- Hamburger Button -->
        <button
          @click="toggleMobileMenu"
          class="lg:hidden flex flex-col justify-center items-center w-11 h-11 z-[1001]"
          aria-label="Toggle menu"
        >
          <span
            class="block w-6 h-0.5 bg-text-dark rounded transition-all duration-300"
            :class="mobileMenuOpen ? 'rotate-45 translate-y-[5px]' : ''"
          ></span>
          <span
            class="block w-6 h-0.5 bg-text-dark rounded my-1 transition-all duration-300"
            :class="mobileMenuOpen ? 'opacity-0' : ''"
          ></span>
          <span
            class="block w-6 h-0.5 bg-text-dark rounded transition-all duration-300"
            :class="mobileMenuOpen ? '-rotate-45 -translate-y-[5px]' : ''"
          ></span>
        </button>
      </div>
    </nav>

    <!-- Mobile Menu Overlay -->
    <div
      class="fixed inset-0 bg-sand-light z-[999] transition-all duration-400 lg:hidden"
      :class="mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'"
    >
      <div class="h-full flex flex-col pt-20 sm:pt-24 md:pt-28 px-6 sm:px-8 pb-8 sm:pb-12">
        <!-- Mobile Links -->
        <ul class="flex-1">
          <li v-for="link in mobileNavLinks" :key="link.path" class="border-b border-black/5">
            <router-link
              :to="link.path"
              @click="closeMobileMenu"
              class="block font-display text-2xl sm:text-3xl text-text-dark py-3 sm:py-4 hover:text-clay hover:pl-3 transition-all min-h-[48px] flex items-center"
            >
              {{ link.name }}
            </router-link>
          </li>
        </ul>

        <!-- Mobile CTA -->
        <router-link
          to="/contact"
          @click="closeMobileMenu"
          class="inline-block text-center px-8 sm:px-10 py-3.5 sm:py-4 bg-earth text-white text-sm sm:text-base font-medium rounded-full hover:bg-clay transition-all mt-6 sm:mt-8 min-h-[48px]"
        >
          Get in Touch
        </router-link>

        <!-- Mobile Footer -->
        <div class="mt-auto pt-6 sm:pt-8">
          <p class="text-xs sm:text-sm text-text-light mb-3 sm:mb-4">Follow us</p>
          <div class="flex gap-3 sm:gap-4">
            <a href="#" class="w-10 h-10 sm:w-11 sm:h-11 bg-sand rounded-full flex items-center justify-center text-text-medium hover:bg-clay hover:text-white transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="18" cy="6" r="1.5" fill="currentColor"/>
              </svg>
            </a>
            <a href="#" class="w-10 h-10 sm:w-11 sm:h-11 bg-sand rounded-full flex items-center justify-center text-text-medium hover:bg-clay hover:text-white transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                <rect x="2" y="9" width="4" height="12"/>
                <circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
            <a href="#" class="w-10 h-10 sm:w-11 sm:h-11 bg-sand rounded-full flex items-center justify-center text-text-medium hover:bg-clay hover:text-white transition-all">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const mobileMenuOpen = ref(false)
const scrolled = ref(false)

const navLinks = [
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]

const mobileNavLinks = [
  { name: 'Home', path: '/' },
  { name: 'Projects', path: '/projects' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' }
]

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
  document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : ''
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
}

const handleResize = () => {
  if (window.innerWidth >= 1024) {
    closeMobileMenu()
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
</style>
