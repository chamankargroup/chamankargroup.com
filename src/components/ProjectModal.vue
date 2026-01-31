<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <div class="modal-header">
            <h2 class="font-display text-2xl md:text-3xl font-medium text-text-dark">{{ project.name }}</h2>
            <button @click="closeModal" class="close-button">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <div class="modal-body">
            <!-- Image Gallery -->
            <div class="mb-8">
              <div class="main-image-container">
                <img
                  v-if="displayImages.length > 0"
                  :src="displayImages[currentImageIndex]"
                  :alt="project.name"
                  class="main-image"
                >
                <div v-else class="placeholder-image">
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#8a847e" stroke-width="1.5">
                    <rect x="4" y="2" width="16" height="20" rx="2"/>
                    <path d="M9 22v-4h6v4"/>
                    <line x1="8" y1="6" x2="16" y2="6"/>
                    <line x1="8" y1="10" x2="16" y2="10"/>
                  </svg>
                </div>

                <!-- Navigation Arrows -->
                <div v-if="displayImages.length > 1" class="image-nav-buttons">
                  <button @click="previousImage" class="nav-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </button>
                  <button @click="nextImage" class="nav-button">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 18l6-6-6-6"/>
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
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c4936a" stroke-width="2" class="inline mr-2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
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
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#c4936a" stroke-width="2" class="inline mr-2">
                    <rect x="3" y="4" width="18" height="18" rx="2"/>
                    <line x1="16" y1="2" x2="16" y2="6"/>
                    <line x1="8" y1="2" x2="8" y2="6"/>
                    <line x1="3" y1="10" x2="21" y2="10"/>
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
            <div class="mt-8">
              <h3 class="font-display text-xl font-medium text-text-dark mb-4">Project Description</h3>
              <p class="text-text-medium leading-relaxed whitespace-pre-line">{{ project.description }}</p>
            </div>

            <!-- Certifications -->
            <div v-if="project.certifications && project.certifications.length > 0" class="mt-8">
              <h3 class="font-display text-xl font-medium text-text-dark mb-4">Certifications & Awards</h3>
              <div class="certifications-list">
                <div v-for="(cert, index) in project.certifications" :key="index" class="certification-item">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#c4936a" stroke-width="2">
                    <path d="M12 15l-2 5l9-9l-9-9l2 5l-5 4z" transform="rotate(45 12 12)"/>
                  </svg>
                  <span>{{ cert }}</span>
                </div>
              </div>
            </div>

            <!-- Features/Highlights -->
            <div v-if="project.features && project.features.length > 0" class="mt-8">
              <h3 class="font-display text-xl font-medium text-text-dark mb-4">Key Features</h3>
              <ul class="features-list">
                <li v-for="(feature, index) in project.features" :key="index" class="feature-item">
                  <div class="feature-check">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
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
  background-color: rgba(46, 42, 38, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 1rem;
  overflow-y: auto;
  backdrop-filter: blur(4px);
}

.modal-container {
  background: #f5f1ec;
  border-radius: 2rem;
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
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #e8ddd4;
  position: sticky;
  top: 0;
  background: #f5f1ec;
  z-index: 10;
  border-radius: 2rem 2rem 0 0;
}

.close-button {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: all 0.3s;
  color: #5a544e;
}

.close-button:hover {
  background-color: #e8ddd4;
  color: #2e2a26;
}

.modal-body {
  padding: 2rem;
}

.main-image-container {
  position: relative;
  width: 100%;
  height: 400px;
  background: #e8ddd4;
  border-radius: 1.5rem;
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
  background: linear-gradient(135deg, #e8ddd4 0%, #d4c4b0 100%);
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
  background: rgba(255, 255, 255, 0.95);
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #5c524a;
}

.nav-button:hover {
  background: white;
  transform: scale(1.1);
  color: #c4936a;
}

.image-counter {
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  background: rgba(92, 82, 74, 0.9);
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
  border-radius: 1rem;
  overflow: hidden;
  border: 3px solid transparent;
  transition: all 0.3s;
}

.thumbnail:hover {
  border-color: #c4936a;
}

.thumbnail-active {
  border-color: #c4936a;
  box-shadow: 0 0 0 3px rgba(196, 147, 106, 0.2);
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
  background: white;
  border-radius: 1.5rem;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.detail-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #8a847e;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.detail-value {
  font-size: 1rem;
  color: #2e2a26;
  font-weight: 500;
  display: flex;
  align-items: center;
}

.type-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(196, 147, 106, 0.15);
  color: #a67b52;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.status-badge {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 600;
}

.status-completed {
  background: rgba(168, 181, 160, 0.2);
  color: #8a9b80;
}

.status-ongoing {
  background: rgba(196, 147, 106, 0.15);
  color: #a67b52;
}

.status-upcoming {
  background: rgba(92, 82, 74, 0.1);
  color: #5c524a;
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
  padding: 1rem;
  background: white;
  border-radius: 1rem;
  border-left: 3px solid #c4936a;
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
  padding: 1rem;
  background: white;
  border-radius: 1rem;
  color: #5a544e;
}

.feature-check {
  width: 24px;
  height: 24px;
  background: rgba(168, 181, 160, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: #8a9b80;
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
  transform: scale(0.95) translateY(20px);
}

@media (max-width: 768px) {
  .modal-container {
    border-radius: 1.5rem;
  }

  .modal-header {
    padding: 1rem 1.5rem;
    border-radius: 1.5rem 1.5rem 0 0;
  }

  .modal-body {
    padding: 1.5rem;
  }

  .main-image-container {
    height: 280px;
    border-radius: 1rem;
  }

  .details-grid {
    grid-template-columns: 1fr;
    border-radius: 1rem;
  }

  .features-list {
    grid-template-columns: 1fr;
  }
}
</style>
