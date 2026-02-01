<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="relative min-h-screen flex items-center pt-28 pb-48 px-6 lg:px-8 bg-gradient-to-b from-sand-light to-sand">
      <div class="max-w-7xl mx-auto w-full">
        <div class="max-w-2xl">
          <!-- Badge -->
          <div class="inline-flex items-center gap-2 px-5 py-2 bg-clay/15 rounded-full mb-8">
            <span class="text-xs font-semibold tracking-wider uppercase text-clay-dark">
              Architecture & Design Studio
            </span>
          </div>

          <!-- Title -->
          <h1 class="font-display text-5xl md:text-7xl font-normal leading-tight mb-7">
            {{ content.hero.title }}
            <span class="text-clay">{{ content.hero.titleHighlight }}</span>
          </h1>

          <!-- Description -->
          <p class="text-lg md:text-xl text-text-medium leading-relaxed mb-12">
            {{ content.hero.description }}
          </p>

          <!-- Buttons -->
          <div class="flex flex-col sm:flex-row gap-4">
            <router-link to="/projects" class="btn-primary text-center">
              Explore Projects
            </router-link>
            <router-link to="/about" class="btn-outline text-center">
              Our Philosophy
            </router-link>
          </div>
        </div>
      </div>

      <!-- Hero Visual -->
      <div class="hidden lg:flex absolute right-16 top-1/2 -translate-y-1/2 w-[40%] aspect-[4/5]">
        <div class="w-full h-full bg-gradient-to-br from-clay to-clay-dark rounded-[200px_200px_100px_100px] flex items-center justify-center overflow-hidden">
          <span class="text-white/60 text-xs tracking-widest uppercase">Featured Project</span>
        </div>
      </div>

      <!-- Wave Divider -->
      <div class="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 150" fill="none" preserveAspectRatio="none" class="w-full h-auto">
          <path d="M0 50C240 100 480 0 720 50C960 100 1200 0 1440 50V150H0V50Z" fill="#ffffff"/>
        </svg>
      </div>
    </section>

    <!-- Featured Projects Section -->
    <section class="py-24 lg:py-32 bg-white px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="text-center max-w-xl mx-auto mb-16">
          <span class="section-tag">Our Portfolio</span>
          <h2 class="section-title">Featured Projects</h2>
          <p class="text-text-medium leading-relaxed">
            Discover our collection of thoughtfully designed spaces that harmonize with their surroundings.
          </p>
        </div>

        <!-- Projects Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="project in featuredProjects"
            :key="project.id"
            class="organic-card cursor-pointer overflow-hidden"
          >
            <div class="aspect-[4/3] bg-gradient-to-br from-sand to-sand-dark flex items-center justify-center rounded-t-3xl overflow-hidden">
              <img
                v-if="project.images && project.images.length > 0"
                :src="project.images[0]"
                :alt="project.name"
                class="w-full h-full object-cover"
              />
              <span v-else class="text-text-light text-xs tracking-widest uppercase">Project Image</span>
            </div>
            <div class="p-7">
              <span class="inline-block px-4 py-1.5 bg-clay/15 rounded-full text-xs font-semibold text-clay-dark uppercase tracking-wide mb-3">
                {{ project.type }}
              </span>
              <h3 class="font-display text-2xl font-medium mb-2">{{ project.name }}</h3>
              <p class="text-text-light text-sm">{{ project.location }}</p>
            </div>
          </div>
        </div>

        <!-- View All Button -->
        <div class="text-center mt-14">
          <router-link to="/projects" class="btn-primary">
            View All Projects
          </router-link>
        </div>
      </div>
    </section>

    <!-- About Section with Curved Background -->
    <section class="relative py-32 lg:py-40 bg-sage overflow-hidden">
      <!-- Top Curve -->
      <div class="absolute top-0 left-0 right-0 h-24 bg-white" style="border-radius: 0 0 50% 50%;"></div>
      <!-- Bottom Curve -->
      <div class="absolute bottom-0 left-0 right-0 h-24 bg-sand-light" style="border-radius: 50% 50% 0 0;"></div>

      <div class="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <!-- Text Content -->
          <div>
            <h2 class="font-display text-4xl lg:text-5xl text-white mb-7 leading-tight">
              Building Dreams That Flow With Life
            </h2>
            <p class="text-white/85 text-lg leading-relaxed mb-5">
              At Chamankar Group, we believe architecture should breathe. Our designs embrace natural forms and organic materials, creating spaces that feel alive and connected to their environment.
            </p>
            <p class="text-white/85 text-lg leading-relaxed mb-10">
              With over 25 years of experience, we've mastered the art of blending innovation with nature's timeless principles.
            </p>

            <!-- Stats Grid -->
            <div class="grid grid-cols-2 gap-6">
              <div v-for="stat in stats" :key="stat.label" class="bg-white/10 rounded-2xl p-6">
                <div class="font-display text-4xl text-white mb-2">{{ stat.number }}</div>
                <div class="text-white/70 text-sm">{{ stat.label }}</div>
              </div>
            </div>
          </div>

          <!-- Visual -->
          <div class="hidden lg:grid grid-cols-2 gap-5">
            <div class="aspect-[3/4] bg-white/20 rounded-full flex items-center justify-center mt-14">
              <span class="text-white/50 text-xs tracking-widest uppercase">Image</span>
            </div>
            <div class="aspect-[3/4] bg-white/20 rounded-full flex items-center justify-center">
              <span class="text-white/50 text-xs tracking-widest uppercase">Image</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section class="py-24 lg:py-32 bg-sand-light px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- Section Header -->
        <div class="text-center max-w-xl mx-auto mb-16">
          <span class="section-tag">What We Do</span>
          <h2 class="section-title">Our Expertise</h2>
        </div>

        <!-- Services Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            v-for="service in services"
            :key="service.id"
            class="bg-white rounded-[2rem] p-10 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
          >
            <div class="w-20 h-20 bg-gradient-to-br from-clay to-clay-dark rounded-full flex items-center justify-center mx-auto mb-7">
              <svg v-if="service.icon === 'home'" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              </svg>
              <svg v-else-if="service.icon === 'building'" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <rect x="4" y="2" width="16" height="20" rx="2"/>
                <path d="M9 22v-4h6v4"/>
              </svg>
              <svg v-else width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M3 21h18M9 21V8l-6 4v9M9 8l6-4 6 4M15 21V8"/>
              </svg>
            </div>
            <h3 class="font-display text-2xl font-medium mb-4">{{ service.title }}</h3>
            <p class="text-text-medium text-sm leading-relaxed">{{ service.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 lg:py-32 bg-gradient-to-br from-clay to-clay-dark text-center px-6 lg:px-8">
      <div class="max-w-2xl mx-auto">
        <h2 class="font-display text-4xl lg:text-5xl text-white mb-6">
          Ready to Create Something Beautiful?
        </h2>
        <p class="text-white/90 text-lg mb-10">
          Let's discuss your vision and explore how organic design can transform your space.
        </p>
        <router-link
          to="/contact"
          class="inline-block px-12 py-5 bg-white text-clay-dark font-semibold rounded-full hover:-translate-y-1 hover:shadow-xl transition-all"
        >
          Start Your Journey
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useSiteContent } from '@/composables/useSiteContent'
import { useProjects } from '@/composables/useProjects'

const { siteContent, fetchContent } = useSiteContent()
const { projects, fetchProjects } = useProjects()

const content = ref({
  hero: {
    title: 'Where Nature Meets',
    titleHighlight: 'Structure',
    description: 'Creating harmonious spaces that flow with life. For 25 years, we\'ve designed architecture that breathes with its environment.'
  }
})

const stats = [
  { number: '25+', label: 'Years of Excellence' },
  { number: '500+', label: 'Projects Completed' },
  { number: '50+', label: 'Awards Won' },
  { number: '100%', label: 'Client Satisfaction' }
]

const services = [
  {
    id: 1,
    icon: 'home',
    title: 'Residential Design',
    description: 'Crafting homes that embrace natural light and organic flow, creating spaces where families thrive.'
  },
  {
    id: 2,
    icon: 'building',
    title: 'Commercial Spaces',
    description: 'Designing workspaces that inspire productivity while maintaining harmony with the environment.'
  },
  {
    id: 3,
    icon: 'landmark',
    title: 'Government Projects',
    description: 'Creating public buildings that serve communities with dignity and architectural excellence.'
  }
]

const featuredProjects = computed(() => {
  return projects.value.filter(p => p.featured).slice(0, 3)
})

onMounted(async () => {
  await Promise.all([fetchContent(), fetchProjects()])

  if (siteContent.value) {
    content.value = {
      hero: {
        title: siteContent.value.hero_title || content.value.hero.title,
        titleHighlight: siteContent.value.hero_subtitle || content.value.hero.titleHighlight,
        description: siteContent.value.hero_description || content.value.hero.description
      }
    }
  }
})
</script>

<style scoped>
</style>
