<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h2 class="text-2xl font-bold text-gray-900">{{ project.name }}</h2>
            <button @click="closeModal" class="close-button">
              <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="modal-body">
            <!-- Image Gallery -->
            <div class="mb-6">
              <div class="main-image-container">
                <img
                  v-if="displayImages.length > 0"
                  :src="displayImages[currentImageIndex]"
                  :alt="project.name"
                  class="main-image"
                >
                <div v-else class="placeholder-image">
                  <span class="text-8xl">🏢</span>
                </div>

                <!-- Navigation Arrows -->
                <div v-if="displayImages.length > 1" class="image-nav-buttons">
                  <button @click="previousImage" class="nav-button nav-button-left">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button @click="nextImage" class="nav-button nav-button-right">
                    <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>

                <!-- Image Counter -->
                <div v-if="displayImages.length > 1" class="image-counter">
                  {{ currentImageIndex + 1 }} / {{ displayImages.length }}
                </div>
              </div>

              <!-- Thumbnail Gallery -->
              <div v-if="displayImages.length > 1" class="thumbnail-gallery">
                <button
                  v-for="(image, index) in displayImages"
                  :key="index"
                  @click="currentImageIndex = index"
                  :class="['thumbnail', { 'thumbnail-active': index === currentImageIndex }]"
                >
                  <img :src="image" :alt="`${project.name} ${index + 1}`" class="thumbnail-img">
                </button>
              </div>
            </div>

            <!-- Project Details Grid -->
            <div class="details-grid">
              <div class="detail-item">
                <div class="detail-label">Location</div>
                <div class="detail-value">
                  <svg class="w-5 h-5 text-primary-600 inline mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"/>
                  </svg>
                  {{ project.location }}
                </div>
              </div>

              <div class="detail-item">
                <div class="detail-label">Project Type</div>
                <div class="detail-value">
                  <span class="type-badge">{{ project.type }}</span>
                </div>
              </div>

              <div v-if="project.completionDate" class="detail-item">
                <div class="detail-label">Completion Date</div>
                <div class="detail-value">
                  <svg class="w-5 h-5 text-primary-600 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {{ project.completionDate }}
                </div>
              </div>

              <div v-if="project.client" class="detail-item">
                <div class="detail-label">Client</div>
                <div class="detail-value">{{ project.client }}</div>
              </div>

              <div v-if="project.area" class="detail-item">
                <div class="detail-label">Project Area</div>
                <div class="detail-value">{{ project.area }}</div>
              </div>

              <div v-if="project.status" class="detail-item">
                <div class="detail-label">Status</div>
                <div class="detail-value">
                  <span :class="['status-badge', getStatusClass(project.status)]">
                    {{ project.status }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Description -->
            <div class="mt-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Project Description</h3>
              <p class="text-gray-700 leading-relaxed whitespace-pre-line">{{ project.description }}</p>
            </div>

            <!-- Certifications -->
            <div v-if="project.certifications && project.certifications.length > 0" class="mt-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Certifications & Awards</h3>
              <div class="certifications-list">
                <div v-for="(cert, index) in project.certifications" :key="index" class="certification-item">
                  <svg class="w-5 h-5 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>{{ cert }}</span>
                </div>
              </div>
            </div>

            <!-- Features/Highlights -->
            <div v-if="project.features && project.features.length > 0" class="mt-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
              <ul class="features-list">
                <li v-for="(feature, index) in project.features" :key="index" class="feature-item">
                  <svg class="w-5 h-5 text-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                  </svg>
                  <span>{{ feature }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, computed, watch } from 'vue'

const props = defineProps({
  show: {
    type: Boolean,
    required: true
  },
  project: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['close'])

const currentImageIndex = ref(0)

const displayImages = computed(() => {
  if (props.project.images && props.project.images.length > 0) {
    return props.project.images
  } else if (props.project.image) {
    return [props.project.image]
  }
  return []
})

const closeModal = () => {
  emit('close')
}

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % displayImages.value.length
}

const previousImage = () => {
  currentImageIndex.value = currentImageIndex.value === 0
    ? displayImages.value.length - 1
    : currentImageIndex.value - 1
}

const getStatusClass = (status) => {
  const statusLower = status?.toLowerCase()
  if (statusLower === 'completed') return 'status-completed'
  if (statusLower === 'ongoing' || statusLower === 'in progress') return 'status-ongoing'
  if (statusLower === 'upcoming') return 'status-upcoming'
  return ''
}

// Reset image index when modal opens
watch(() => props.show, (newVal) => {
  if (newVal) {
    currentImageIndex.value = 0
  }
})

// Keyboard navigation
const handleKeydown = (e) => {
  if (!props.show) return
  if (e.key === 'Escape') closeModal()
  if (e.key === 'ArrowLeft') previousImage()
  if (e.key === 'ArrowRight') nextImage()
}

if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeydown)
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  overflow-y: auto;
}

.modal-container {
  background: white;
  border-radius: 1rem;
  width: 100%;
  max-width: 1000px;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e5e7eb;
  position: sticky;
  top: 0;
  background: white;
  z-index: 10;
  border-radius: 1rem 1rem 0 0;
}

.close-button {
  padding: 0.5rem;
  border-radius: 0.5rem;
  transition: background-color 0.2s;
  color: #6b7280;
}

.close-button:hover {
  background-color: #f3f4f6;
  color: #111827;
}

.modal-body {
  padding: 1.5rem;
}

.main-image-container {
  position: relative;
  width: 100%;
  height: 400px;
  background: #f3f4f6;
  border-radius: 0.75rem;
  overflow: hidden;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.placeholder-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #fef3e7 0%, #e0ebff 100%);
}

.image-nav-buttons {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  pointer-events: none;
}

.nav-button {
  pointer-events: all;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  padding: 0.75rem;
  transition: all 0.2s;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

.nav-button:hover {
  background: white;
  transform: scale(1.1);
}

.image-counter {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 1.5rem;
  font-size: 0.875rem;
  font-weight: 500;
}

.thumbnail-gallery {
  display: flex;
  gap: 0.75rem;
  margin-top: 1rem;
  overflow-x: auto;
  padding: 0.5rem 0;
}

.thumbnail {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 0.5rem;
  overflow: hidden;
  border: 2px solid transparent;
  transition: all 0.2s;
}

.thumbnail:hover {
  border-color: #f5911f;
}

.thumbnail-active {
  border-color: #f5911f;
  box-shadow: 0 0 0 3px rgba(245, 145, 31, 0.2);
}

.thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-top: 1.5rem;
  padding: 1.5rem;
  background: #f9fafb;
  border-radius: 0.75rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.detail-value {
  font-size: 1rem;
  color: #111827;
  font-weight: 500;
}

.type-badge {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  background: #fef3e7;
  color: #c47419;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.status-badge {
  display: inline-block;
  padding: 0.375rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.status-completed {
  background: #d1fae5;
  color: #065f46;
}

.status-ongoing {
  background: #dbeafe;
  color: #1e40af;
}

.status-upcoming {
  background: #fef3c7;
  color: #92400e;
}

.certifications-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.certification-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 0.5rem;
  border-left: 3px solid #f5911f;
}

.features-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 0.75rem;
}

.feature-item {
  display: flex;
  align-items: start;
  gap: 0.75rem;
  padding: 0.75rem;
  background: #f9fafb;
  border-radius: 0.5rem;
}

/* Modal Transition */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-container,
.modal-leave-active .modal-container {
  transition: transform 0.3s ease;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  transform: scale(0.9);
}

@media (max-width: 768px) {
  .main-image-container {
    height: 300px;
  }

  .details-grid {
    grid-template-columns: 1fr;
  }

  .features-list {
    grid-template-columns: 1fr;
  }
}
</style>
