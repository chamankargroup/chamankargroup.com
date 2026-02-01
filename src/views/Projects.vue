<template>
  <div class="projects">
    <!-- Page Header -->
    <section class="relative pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sand-light to-sand">
      <div class="max-w-7xl mx-auto text-center">
        <span class="section-tag">Our Portfolio</span>
        <h1 class="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 sm:mb-6">Our Projects</h1>
        <p class="text-text-medium text-base sm:text-lg max-w-2xl mx-auto px-4">
          Discover our collection of thoughtfully designed spaces that harmonize with their surroundings.
        </p>
      </div>
    </section>

    <!-- Filter Tabs -->
    <section class="bg-white py-4 sm:py-6 lg:py-8 px-4 sm:px-6 lg:px-8 border-b border-sand sticky top-16 sm:top-[72px] z-40">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-wrap justify-center gap-2 sm:gap-3">
          <button
            v-for="filter in filters"
            :key="filter"
            @click="activeFilter = filter"
            class="px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all min-h-[40px]"
            :class="activeFilter === filter
              ? 'bg-earth text-white'
              : 'bg-sand-light text-text-medium hover:bg-sand active:bg-sand'"
          >
            {{ filter }}
          </button>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="py-10 sm:py-16 lg:py-24 bg-white px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div v-if="filteredProjects.length === 0" class="text-center py-12 sm:py-20">
          <div class="w-16 h-16 sm:w-20 sm:h-20 bg-sand rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
            <svg class="w-6 h-6 sm:w-8 sm:h-8" viewBox="0 0 24 24" fill="none" stroke="#8a847e" stroke-width="2">
              <path d="M3 21h18M9 21V8l-6 4v9M9 8l6-4 6 4M15 21V8"/>
            </svg>
          </div>
          <h3 class="font-display text-xl sm:text-2xl mb-2 sm:mb-3">No Projects Available</h3>
          <p class="text-text-light text-sm sm:text-base">Projects will be added soon.</p>
        </div>

        <Transition v-else name="tab-fade" mode="out-in">
          <div
            :key="activeFilter"
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
          >
            <div
              v-for="project in filteredProjects"
              :key="project.id"
              @click="openProjectModal(project)"
              class="organic-card cursor-pointer overflow-hidden group"
            >
            <!-- Project Image -->
            <div class="aspect-[4/3] overflow-hidden bg-sand relative rounded-t-2xl sm:rounded-t-3xl">
              <img
                v-if="getProjectMainImage(project)"
                :src="getProjectMainImage(project)"
                :alt="project.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              >
              <div v-else class="w-full h-full bg-gradient-to-br from-sand to-sand-dark flex items-center justify-center">
                <svg class="w-10 h-10 sm:w-12 sm:h-12" viewBox="0 0 24 24" fill="none" stroke="#8a847e" stroke-width="1.5">
                  <rect x="4" y="2" width="16" height="20" rx="2"/>
                  <path d="M9 22v-4h6v4"/>
                  <line x1="8" y1="6" x2="16" y2="6"/>
                  <line x1="8" y1="10" x2="16" y2="10"/>
                  <line x1="8" y1="14" x2="12" y2="14"/>
                </svg>
              </div>
              <!-- Image Badge -->
              <div v-if="getImageCount(project) > 1" class="absolute top-3 right-3 sm:top-4 sm:right-4 bg-earth/90 text-white px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium flex items-center gap-1 sm:gap-1.5">
                <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
                {{ getImageCount(project) }}
              </div>
            </div>

            <!-- Project Details -->
            <div class="p-5 sm:p-6 lg:p-7">
              <span class="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-clay/15 rounded-full text-[10px] sm:text-xs font-semibold text-clay-dark uppercase tracking-wide mb-2 sm:mb-3">
                {{ project.type }}
              </span>
              <h3 class="font-display text-xl sm:text-2xl font-medium mb-1 sm:mb-2 group-hover:text-clay transition-colors">{{ project.name }}</h3>
              <p class="text-text-light text-xs sm:text-sm flex items-center gap-1 sm:gap-1.5 mb-3 sm:mb-4">
                <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {{ project.location }}
              </p>
              <p class="text-text-medium text-xs sm:text-sm leading-relaxed line-clamp-2">{{ project.description }}</p>
              <div class="mt-4 sm:mt-5 flex items-center text-clay text-xs sm:text-sm font-medium group-hover:gap-2 transition-all">
                View Details
                <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
        </Transition>
      </div>
    </section>

    <!-- Project Modal -->
    <ProjectModal
      :show="showModal"
      :project="selectedProject"
      @close="closeModal"
    />

    <!-- CTA Section -->
    <section class="py-16 sm:py-20 lg:py-32 bg-sand-light px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto text-center">
        <span class="section-tag">Let's Work Together</span>
        <h2 class="section-title text-3xl sm:text-4xl md:text-5xl">Interested in Our Work?</h2>
        <p class="text-text-medium text-base sm:text-lg mb-8 sm:mb-10">
          Let's discuss how we can bring your architectural vision to life.
        </p>
        <router-link to="/contact" class="btn-primary text-sm sm:text-base">
          Start a Conversation
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProjectModal from '../components/ProjectModal.vue'
import { useProjects } from '@/composables/useProjects'

const { projects, fetchProjects } = useProjects()

const showModal = ref(false)
const selectedProject = ref({})
const activeFilter = ref('All')

const filters = ['All', 'Residential', 'Commercial', 'Government']

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') {
    return projects.value
  }
  return projects.value.filter(p => p.type === activeFilter.value)
})

const openProjectModal = (project) => {
  selectedProject.value = project
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
}

const getProjectMainImage = (project) => {
  if (project.images && project.images.length > 0) {
    return project.images[0]
  } else if (project.image) {
    return project.image
  }
  return null
}

const getImageCount = (project) => {
  if (project.images && project.images.length > 0) {
    return project.images.length
  } else if (project.image) {
    return 1
  }
  return 0
}

onMounted(() => {
  fetchProjects()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Tab switch animation */
.tab-fade-enter-active,
.tab-fade-leave-active {
  transition: opacity 0.2s ease;
}

.tab-fade-enter-from,
.tab-fade-leave-to {
  opacity: 0;
}
</style>
