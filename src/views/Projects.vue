<template>
  <div class="projects">
    <!-- Page Header -->
    <section class="bg-gradient-to-r from-primary-600 to-secondary-600 text-white py-20">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 class="text-4xl md:text-5xl font-bold text-center mb-4">Our Projects</h1>
        <p class="text-xl text-center text-gray-100">Transforming Mumbai's skyline for over 25 years</p>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div v-if="projects.length === 0" class="text-center py-12">
          <div class="text-6xl mb-4">🏗️</div>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">No Projects Available</h3>
          <p class="text-gray-600">Projects will be added soon.</p>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="project in projects" :key="project.id" class="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer" @click="openProjectModal(project)">
            <!-- Project Image -->
            <div class="h-64 overflow-hidden bg-gray-200 relative">
              <img v-if="getProjectMainImage(project)" :src="getProjectMainImage(project)" :alt="project.name" class="w-full h-full object-cover">
              <div v-else class="w-full h-full bg-gradient-to-br from-primary-200 to-secondary-200 flex items-center justify-center">
                <span class="text-7xl">🏢</span>
              </div>
              <!-- Image Badge -->
              <div v-if="getImageCount(project) > 1" class="absolute top-3 right-3 bg-black bg-opacity-70 text-white px-3 py-1 rounded-full text-xs font-semibold">
                <svg class="w-4 h-4 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"/>
                </svg>
                {{ getImageCount(project) }} Photos
              </div>
            </div>

            <!-- Project Details -->
            <div class="p-6">
              <h3 class="text-xl font-bold mb-2 text-gray-900">{{ project.name }}</h3>
              <p class="text-sm text-primary-600 mb-3 flex items-center">
                <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                </svg>
                {{ project.location }}
              </p>
              <p class="text-gray-700 text-sm mb-4 line-clamp-3">{{ project.description }}</p>
              <div class="flex items-center justify-between">
                <div v-if="project.type" class="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-xs font-semibold rounded-full">
                  {{ project.type }}
                </div>
                <button class="text-primary-600 hover:text-primary-700 text-sm font-semibold flex items-center">
                  View Details
                  <svg class="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>
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
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Interested in Our Work?</h2>
        <p class="text-xl text-gray-600 mb-8">Let's discuss your next project</p>
        <router-link to="/contact" class="inline-block bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors">
          Contact Us
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProjectModal from '../components/ProjectModal.vue'

const projects = ref([])
const showModal = ref(false)
const selectedProject = ref({})

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
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
