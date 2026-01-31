<template>
  <div class="projects">
    <!-- Page Header -->
    <section class="relative pt-32 pb-20 px-6 lg:px-8 bg-gradient-to-b from-sand-light to-sand">
      <div class="max-w-7xl mx-auto text-center">
        <span class="section-tag">Our Portfolio</span>
        <h1 class="font-display text-5xl md:text-6xl font-normal mb-6">Our Projects</h1>
        <p class="text-text-medium text-lg max-w-2xl mx-auto">
          Discover our collection of thoughtfully designed spaces that harmonize with their surroundings.
        </p>
      </div>
    </section>

    <!-- Filter Tabs -->
    <section class="bg-white py-8 px-6 lg:px-8 border-b border-sand">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-wrap justify-center gap-3">
          <button
            v-for="filter in filters"
            :key="filter"
            @click="activeFilter = filter"
            class="px-6 py-2.5 rounded-full text-sm font-medium transition-all"
            :class="activeFilter === filter
              ? 'bg-earth text-white'
              : 'bg-sand-light text-text-medium hover:bg-sand'"
          >
            {{ filter }}
          </button>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="py-16 lg:py-24 bg-white px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div v-if="filteredProjects.length === 0" class="text-center py-20">
          <div class="w-20 h-20 bg-sand rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8a847e" stroke-width="2">
              <path d="M3 21h18M9 21V8l-6 4v9M9 8l6-4 6 4M15 21V8"/>
            </svg>
          </div>
          <h3 class="font-display text-2xl mb-3">No Projects Available</h3>
          <p class="text-text-light">Projects will be added soon.</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            @click="openProjectModal(project)"
            class="organic-card cursor-pointer overflow-hidden group"
          >
            <!-- Project Image -->
            <div class="aspect-[4/3] overflow-hidden bg-sand relative rounded-t-3xl">
              <img
                v-if="getProjectMainImage(project)"
                :src="getProjectMainImage(project)"
                :alt="project.name"
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              >
              <div v-else class="w-full h-full bg-gradient-to-br from-sand to-sand-dark flex items-center justify-center">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8a847e" stroke-width="1.5">
                  <rect x="4" y="2" width="16" height="20" rx="2"/>
                  <path d="M9 22v-4h6v4"/>
                  <line x1="8" y1="6" x2="16" y2="6"/>
                  <line x1="8" y1="10" x2="16" y2="10"/>
                  <line x1="8" y1="14" x2="12" y2="14"/>
                </svg>
              </div>
              <!-- Image Badge -->
              <div v-if="getImageCount(project) > 1" class="absolute top-4 right-4 bg-earth/90 text-white px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
                {{ getImageCount(project) }}
              </div>
            </div>

            <!-- Project Details -->
            <div class="p-7">
              <span class="inline-block px-4 py-1.5 bg-clay/15 rounded-full text-xs font-semibold text-clay-dark uppercase tracking-wide mb-3">
                {{ project.type }}
              </span>
              <h3 class="font-display text-2xl font-medium mb-2 group-hover:text-clay transition-colors">{{ project.name }}</h3>
              <p class="text-text-light text-sm flex items-center gap-1.5 mb-4">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                  <circle cx="12" cy="10" r="3"/>
                </svg>
                {{ project.location }}
              </p>
              <p class="text-text-medium text-sm leading-relaxed line-clamp-2">{{ project.description }}</p>
              <div class="mt-5 flex items-center text-clay text-sm font-medium group-hover:gap-2 transition-all">
                View Details
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="ml-1">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Project Modal -->
    <ProjectModal
      :show="showModal"
      :project="selectedProject"
      @close="closeModal"
    />

    <!-- CTA Section -->
    <section class="py-24 lg:py-32 bg-sand-light px-6 lg:px-8">
      <div class="max-w-3xl mx-auto text-center">
        <span class="section-tag">Let's Work Together</span>
        <h2 class="section-title">Interested in Our Work?</h2>
        <p class="text-text-medium text-lg mb-10">
          Let's discuss how we can bring your architectural vision to life.
        </p>
        <router-link to="/contact" class="btn-primary">
          Start a Conversation
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProjectModal from '../components/ProjectModal.vue'

const projects = ref([])
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

const loadProjects = () => {
  const storedProjects = localStorage.getItem('chamankarProjects')
  if (storedProjects) {
    projects.value = JSON.parse(storedProjects)
  } else {
    // Initialize with sample projects
    projects.value = [
      {
        id: 1,
        name: 'New Maharashtra Sadan',
        location: 'New Delhi',
        description: 'A prestigious government project showcasing architectural excellence and modern design principles.',
        type: 'Government',
        image: ''
      },
      {
        id: 2,
        name: 'Epitome at Pali Hill',
        location: 'Bandra West, Mumbai',
        description: 'Luxurious residential tower in the heart of Bandra offering world-class amenities and stunning views.',
        type: 'Residential',
        image: ''
      },
      {
        id: 3,
        name: 'Andheri RTO',
        location: 'Andheri, Mumbai',
        description: 'Modern government building with state-of-the-art facilities for streamlined operations.',
        type: 'Government',
        image: ''
      },
      {
        id: 4,
        name: 'High Mount VIP Guest House',
        location: 'Walkeshwar, Mumbai',
        description: 'Exclusive VIP government guest house with premium facilities and scenic location.',
        type: 'Government',
        image: ''
      },
      {
        id: 5,
        name: 'Navratna Project',
        location: 'Santacruz, Mumbai',
        description: 'Upcoming residential tower with contemporary design and modern living spaces.',
        type: 'Residential',
        image: ''
      },
      {
        id: 6,
        name: 'S.S Sadan JVPD',
        location: 'Vile Parle, Mumbai',
        description: 'Premium residential tower in the sought-after JVPD area.',
        type: 'Residential',
        image: ''
      },
      {
        id: 7,
        name: 'Krishna Villa',
        location: 'Vile Parle, Mumbai',
        description: 'Elegant residential development combining comfort and style.',
        type: 'Residential',
        image: ''
      },
      {
        id: 8,
        name: 'Versova Aditi CHS LTD',
        location: 'Andheri 4 Bungalows, Mumbai',
        description: 'Well-planned residential complex with modern amenities.',
        type: 'Residential',
        image: ''
      },
      {
        id: 9,
        name: 'Asha Apartment',
        location: 'Vile Parle (E), Mumbai',
        description: 'Upcoming residential project offering comfortable living spaces.',
        type: 'Residential',
        image: ''
      }
    ]
    localStorage.setItem('chamankarProjects', JSON.stringify(projects.value))
  }
}

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
  loadProjects()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
