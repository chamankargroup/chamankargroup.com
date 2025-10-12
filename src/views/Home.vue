<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-section relative bg-gradient-to-r from-primary-600 to-secondary-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div class="text-center">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            {{ content.hero.title }}
          </h1>
          <p class="text-xl md:text-2xl mb-8 text-gray-100">
            {{ content.hero.subtitle }}
          </p>
          <p class="text-lg mb-8 max-w-3xl mx-auto">
            {{ content.hero.description }}
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <router-link to="/projects" class="bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              View Projects
            </router-link>
            <router-link to="/contact" class="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
              Contact Us
            </router-link>
          </div>
        </div>
      </div>
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
        </svg>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
          <p class="text-lg text-gray-600">Discover our landmark developments across Mumbai and India</p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="project in featuredProjects" :key="project.id" class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <div class="h-48 bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center">
              <span class="text-6xl">🏢</span>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2">{{ project.name }}</h3>
              <p class="text-gray-600 text-sm mb-4">{{ project.location }}</p>
              <p class="text-gray-700">{{ project.description }}</p>
            </div>
          </div>
        </div>
        <div class="text-center mt-12">
          <router-link to="/projects" class="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
            View All Projects
          </router-link>
        </div>
      </div>
    </section>

    <!-- Why Choose Us Section -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Why Choose Chamankar Group</h2>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div v-for="item in content.whyChoose" :key="item.id" class="text-center">
            <div class="text-5xl mb-4">{{ item.icon }}</div>
            <h3 class="text-xl font-bold mb-2">{{ item.title }}</h3>
            <p class="text-gray-600">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Project?</h2>
        <p class="text-xl mb-8">Let's discuss how we can bring your vision to life</p>
        <router-link to="/contact" class="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          Get in Touch
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { loadContent } from '@/utils/contentManager'

const content = ref({
  hero: { title: '', subtitle: '', description: '' },
  whyChoose: []
})

const featuredProjects = [
  {
    id: 1,
    name: 'New Maharashtra Sadan',
    location: 'New Delhi',
    description: 'A prestigious government project showcasing architectural excellence.'
  },
  {
    id: 2,
    name: 'Epitome at Pali Hill',
    location: 'Bandra West, Mumbai',
    description: 'Luxurious residential tower in the heart of Bandra.'
  },
  {
    id: 3,
    name: 'Andheri RTO',
    location: 'Andheri, Mumbai',
    description: 'Modern government building with state-of-the-art facilities.'
  }
]

onMounted(() => {
  const loadedContent = loadContent()
  content.value = loadedContent
})
</script>

<style scoped>
</style>
