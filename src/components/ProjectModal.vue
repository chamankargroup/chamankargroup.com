<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="show" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <!-- Close Button -->
          <button @click="closeModal" class="close-button">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>

          <!-- Main Content Grid -->
          <div class="modal-content">
            <!-- Left Sidebar - Project Info -->
            <aside class="project-sidebar">
              <div class="sidebar-content">
                <!-- Project Title -->
                <div class="project-header">
                  <h1 class="project-title">{{ project.name }}</h1>
                  <p class="project-location">{{ project.location }}</p>
                </div>

                <!-- Project Metadata -->
                <div class="project-meta">
                  <div v-if="project.completionDate || project.year" class="meta-item">
                    <span class="meta-label">Year</span>
                    <span class="meta-value">{{ project.year || project.completionDate }}</span>
                  </div>

                  <div v-if="project.client" class="meta-item">
                    <span class="meta-label">Client</span>
                    <span class="meta-value">{{ project.client }}</span>
                  </div>

                  <div class="meta-item">
                    <span class="meta-label">Typology</span>
                    <span class="meta-value">{{ project.type }}</span>
                  </div>

                  <div v-if="project.area" class="meta-item">
                    <span class="meta-label">Size</span>
                    <span class="meta-value">{{ project.area }}</span>
                  </div>

                  <div v-if="project.status" class="meta-item">
                    <span class="meta-label">Status</span>
                    <span class="meta-value">{{ project.status }}</span>
                  </div>
                </div>

              </div>
            </aside>

            <!-- Center - Image Gallery -->
            <main class="project-gallery">
              <div class="gallery-container">
                <!-- Main Image -->
                <div class="main-image-wrapper">
                  <img
                    v-if="displayImages.length > 0"
                    :src="displayImages[currentImageIndex]"
                    :alt="project.name"
                    class="main-image"
                  >
                  <div v-else class="placeholder-image">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#8a847e" stroke-width="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2"/>
                      <circle cx="8.5" cy="8.5" r="1.5"/>
                      <path d="M21 15l-5-5L5 21"/>
                    </svg>
                  </div>

                  <!-- Navigation Arrows -->
                  <div v-if="displayImages.length > 1" class="gallery-nav">
                    <button @click="previousImage" class="nav-arrow nav-prev">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 18l-6-6 6-6"/>
                      </svg>
                    </button>
                    <button @click="nextImage" class="nav-arrow nav-next">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </button>
                  </div>

                  <!-- Image Counter -->
                  <div v-if="displayImages.length > 1" class="image-counter">
                    <span>{{ currentImageIndex + 1 }}</span>
                    <span class="counter-divider">/</span>
                    <span>{{ displayImages.length }}</span>
                  </div>
                </div>

                <!-- Thumbnail Strip -->
                <div v-if="displayImages.length > 1" class="thumbnail-strip">
                  <button
                    v-for="(image, index) in displayImages"
                    :key="index"
                    @click="currentImageIndex = index"
                    :class="['thumbnail', { 'thumbnail-active': index === currentImageIndex }]"
                  >
                    <img :src="image" :alt="`${project.name} ${index + 1}`">
                  </button>
                </div>
              </div>
            </main>

            <!-- Right - Description -->
            <aside class="project-description">
              <div class="description-content">
                <p class="description-text">{{ project.description }}</p>

                <!-- Features if available -->
                <div v-if="project.features && project.features.length > 0" class="features-section">
                  <h3 class="features-title">Key Features</h3>
                  <ul class="features-list">
                    <li v-for="(feature, index) in project.features" :key="index">
                      {{ feature }}
                    </li>
                  </ul>
                </div>

                <!-- Certifications if available -->
                <div v-if="project.certifications && project.certifications.length > 0" class="certifications-section">
                  <h3 class="certifications-title">Certifications</h3>
                  <ul class="certifications-list">
                    <li v-for="(cert, index) in project.certifications" :key="index">
                      {{ cert }}
                    </li>
                  </ul>
                </div>
              </div>
            </aside>
          </div>

          <!-- Mobile Layout - Scrollable -->
          <div class="modal-content-mobile">
            <!-- Header with close -->
            <div class="mobile-header">
              <h1 class="mobile-title">{{ project.name }}</h1>
              <p class="mobile-location">{{ project.location }}</p>
            </div>

            <!-- Image Gallery -->
            <div class="mobile-gallery">
              <div class="mobile-image-wrapper">
                <img
                  v-if="displayImages.length > 0"
                  :src="displayImages[currentImageIndex]"
                  :alt="project.name"
                  class="mobile-main-image"
                >
                <div v-else class="mobile-placeholder">
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#8a847e" stroke-width="1.5">
                    <rect x="3" y="3" width="18" height="18" rx="2"/>
                    <circle cx="8.5" cy="8.5" r="1.5"/>
                    <path d="M21 15l-5-5L5 21"/>
                  </svg>
                </div>

                <!-- Mobile Nav -->
                <div v-if="displayImages.length > 1" class="mobile-gallery-nav">
                  <button @click="previousImage" class="mobile-nav-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M15 18l-6-6 6-6"/>
                    </svg>
                  </button>
                  <span class="mobile-counter">{{ currentImageIndex + 1 }} / {{ displayImages.length }}</span>
                  <button @click="nextImage" class="mobile-nav-btn">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <path d="M9 18l6-6-6-6"/>
                    </svg>
                  </button>
                </div>
              </div>

              <!-- Mobile Thumbnails -->
              <div v-if="displayImages.length > 1" class="mobile-thumbnails">
                <button
                  v-for="(image, index) in displayImages"
                  :key="index"
                  @click="currentImageIndex = index"
                  :class="['mobile-thumb', { 'mobile-thumb-active': index === currentImageIndex }]"
                >
                  <img :src="image" :alt="`${project.name} ${index + 1}`">
                </button>
              </div>
            </div>

            <!-- Mobile Info Grid -->
            <div class="mobile-info">
              <div class="mobile-meta-grid">
                <div v-if="project.completionDate || project.year" class="mobile-meta-item">
                  <span class="mobile-meta-label">Year</span>
                  <span class="mobile-meta-value">{{ project.year || project.completionDate }}</span>
                </div>
                <div v-if="project.client" class="mobile-meta-item">
                  <span class="mobile-meta-label">Client</span>
                  <span class="mobile-meta-value">{{ project.client }}</span>
                </div>
                <div class="mobile-meta-item">
                  <span class="mobile-meta-label">Type</span>
                  <span class="mobile-meta-value">{{ project.type }}</span>
                </div>
                <div v-if="project.area" class="mobile-meta-item">
                  <span class="mobile-meta-label">Size</span>
                  <span class="mobile-meta-value">{{ project.area }}</span>
                </div>
                <div v-if="project.status" class="mobile-meta-item">
                  <span class="mobile-meta-label">Status</span>
                  <span class="mobile-meta-value">{{ project.status }}</span>
                </div>
              </div>

              <!-- Description -->
              <div class="mobile-description">
                <p>{{ project.description }}</p>
              </div>

              <!-- Features -->
              <div v-if="project.features && project.features.length > 0" class="mobile-features">
                <h3>Key Features</h3>
                <ul>
                  <li v-for="(feature, index) in project.features" :key="index">{{ feature }}</li>
                </ul>
              </div>

              <!-- Certifications -->
              <div v-if="project.certifications && project.certifications.length > 0" class="mobile-certifications">
                <h3>Certifications</h3>
                <ul>
                  <li v-for="(cert, index) in project.certifications" :key="index">{{ cert }}</li>
                </ul>
              </div>

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

// Reset image index when modal opens
watch(() => props.show, (newVal) => {
  if (newVal) {
    currentImageIndex.value = 0
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
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
  inset: 0;
  background-color: rgba(0, 0, 0, 0.92);
  z-index: 9999;
  overflow-y: auto;
}

.modal-container {
  min-height: 100vh;
  width: 100%;
  position: relative;
}

.close-button {
  position: fixed;
  top: 1.5rem;
  right: 1.5rem;
  z-index: 100;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  opacity: 0.7;
  transition: opacity 0.2s;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
}

.close-button:hover {
  opacity: 1;
  background: rgba(255, 255, 255, 0.2);
}

/* Desktop Layout */
.modal-content {
  display: none;
  min-height: 100vh;
  padding: 4rem 3rem;
}

@media (min-width: 1024px) {
  .modal-content {
    display: grid;
    grid-template-columns: 240px 1fr 280px;
    gap: 2.5rem;
    max-width: 1600px;
    margin: 0 auto;
  }
}

@media (min-width: 1280px) {
  .modal-content {
    grid-template-columns: 260px 1fr 300px;
    gap: 3rem;
    padding: 4rem 3rem;
  }
}

@media (min-width: 1536px) {
  .modal-content {
    grid-template-columns: 280px 1fr 320px;
    gap: 4rem;
    padding: 4rem;
  }

  .main-image-wrapper {
    min-height: 600px;
  }
}

/* Left Sidebar */
.project-sidebar {
  position: sticky;
  top: 4rem;
  height: fit-content;
}

.sidebar-content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.project-header {
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.project-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem;
  font-weight: 500;
  color: white;
  line-height: 1.2;
  margin-bottom: 0.5rem;
}

.project-location {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  letter-spacing: 0.02em;
}

.project-meta {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.meta-label {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.4);
}

.meta-value {
  font-size: 0.95rem;
  color: white;
  font-weight: 400;
}

/* Center Gallery */
.project-gallery {
  display: flex;
  flex-direction: column;
}

.gallery-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.main-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  overflow: hidden;
  min-height: 500px;
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
  background: rgba(255, 255, 255, 0.03);
}

.gallery-nav {
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
}

.main-image-wrapper:hover .gallery-nav {
  opacity: 1;
}

.nav-arrow {
  pointer-events: all;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: 50%;
  transition: all 0.2s;
}

.nav-arrow:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.05);
}

.image-counter {
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 2rem;
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
}

.counter-divider {
  opacity: 0.5;
}

.thumbnail-strip {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 0.25rem 0;
}

.thumbnail-strip::-webkit-scrollbar {
  height: 4px;
}

.thumbnail-strip::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 2px;
}

.thumbnail-strip::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 2px;
}

.thumbnail {
  flex-shrink: 0;
  width: 80px;
  height: 60px;
  border-radius: 0.25rem;
  overflow: hidden;
  opacity: 0.5;
  transition: opacity 0.2s;
  border: 2px solid transparent;
}

.thumbnail:hover {
  opacity: 0.8;
}

.thumbnail-active {
  opacity: 1;
  border-color: white;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Right Description */
.project-description {
  position: sticky;
  top: 4rem;
  height: fit-content;
}

.description-content {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.description-text {
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
}

.features-section,
.certifications-section {
  padding-top: 1.5rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.features-title,
.certifications-title {
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 1rem;
}

.features-list,
.certifications-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.features-list li,
.certifications-list li {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  padding-left: 1rem;
  position: relative;
}

.features-list li::before,
.certifications-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.6em;
  width: 4px;
  height: 4px;
  background: #c4936a;
  border-radius: 50%;
}

/* Mobile Layout */
.modal-content-mobile {
  display: block;
  padding-bottom: 2rem;
}

@media (min-width: 1024px) {
  .modal-content-mobile {
    display: none;
  }
}

.mobile-header {
  padding: 1.5rem;
  padding-top: 5rem;
  text-align: center;
}

.mobile-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.75rem;
  font-weight: 500;
  color: white;
  margin-bottom: 0.25rem;
}

.mobile-location {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.6);
}

.mobile-gallery {
  padding: 0 1rem;
}

.mobile-image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 0.75rem;
  overflow: hidden;
}

.mobile-main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mobile-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.mobile-gallery-nav {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(to top, rgba(0,0,0,0.6), transparent);
}

.mobile-nav-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  border-radius: 50%;
}

.mobile-counter {
  color: white;
  font-size: 0.85rem;
  font-weight: 500;
}

.mobile-thumbnails {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding: 1rem 0;
}

.mobile-thumb {
  flex-shrink: 0;
  width: 60px;
  height: 45px;
  border-radius: 0.375rem;
  overflow: hidden;
  opacity: 0.5;
  transition: opacity 0.2s;
  border: 2px solid transparent;
}

.mobile-thumb-active {
  opacity: 1;
  border-color: white;
}

.mobile-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.mobile-info {
  padding: 1.5rem;
}

.mobile-meta-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-meta-item {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.mobile-meta-label {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.4);
}

.mobile-meta-value {
  font-size: 0.875rem;
  color: white;
}

.mobile-description {
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-description p {
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
}

.mobile-features,
.mobile-certifications {
  padding: 1.5rem 0;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.mobile-features h3,
.mobile-certifications h3 {
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255, 255, 255, 0.4);
  margin-bottom: 0.75rem;
}

.mobile-features ul,
.mobile-certifications ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.375rem;
}

.mobile-features li,
.mobile-certifications li {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  padding-left: 0.875rem;
  position: relative;
}

.mobile-features li::before,
.mobile-certifications li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.5em;
  width: 4px;
  height: 4px;
  background: #c4936a;
  border-radius: 50%;
}

/* Transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active .modal-content,
.modal-enter-active .modal-content-mobile,
.modal-leave-active .modal-content,
.modal-leave-active .modal-content-mobile {
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-enter-from .modal-content,
.modal-enter-from .modal-content-mobile,
.modal-leave-to .modal-content,
.modal-leave-to .modal-content-mobile {
  transform: translateY(20px);
  opacity: 0;
}
</style>
