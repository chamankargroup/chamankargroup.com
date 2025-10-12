<template>
  <div class="about">
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl md:text-5xl font-bold text-center">About Chamankar Group</h1>
      </div>
    </section>

    <!-- Company Introduction -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-gray-900 mb-6 text-center">Who We Are</h2>
          <p class="text-lg text-gray-700 leading-relaxed mb-6">
            {{ content.about.intro }}
          </p>
        </div>
      </div>
    </section>

    <!-- Our Vision -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-gray-900 mb-6 text-center">{{ content.about.vision.title }}</h2>
          <div class="bg-white p-8 rounded-lg shadow-lg">
            <p v-for="(paragraph, index) in content.about.vision.paragraphs" :key="index" class="text-lg text-gray-700 leading-relaxed mb-4 last:mb-0">
              {{ paragraph }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Values -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">Our Core Values</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div v-for="value in content.about.values" :key="value.id" class="text-center p-6">
            <div class="text-5xl mb-4">{{ value.icon }}</div>
            <h3 class="text-xl font-bold mb-3">{{ value.title }}</h3>
            <p class="text-gray-600">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Expertise -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">Our Expertise</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div v-for="expertise in content.about.expertise" :key="expertise.id" class="bg-white p-8 rounded-lg shadow-lg">
            <div class="text-4xl mb-4">{{ expertise.icon }}</div>
            <h3 class="text-xl font-bold mb-3">{{ expertise.title }}</h3>
            <p class="text-gray-600">{{ expertise.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 bg-primary-600 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold mb-4">Want to Learn More?</h2>
        <p class="text-xl mb-8">Discover our portfolio of exceptional projects</p>
        <router-link to="/projects" class="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
          View Our Projects
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { loadContent } from '@/utils/contentManager'

const content = ref({
  about: {
    intro: '',
    vision: {
      title: '',
      paragraphs: []
    },
    values: [],
    expertise: []
  }
})

onMounted(() => {
  const loadedContent = loadContent()
  content.value = loadedContent
})
</script>

<style scoped>
</style>
