<template>
  <div class="contact">
    <!-- Page Header -->
    <section class="relative pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sand-light to-sand">
      <div class="max-w-7xl mx-auto text-center">
        <span class="section-tag">Get in Touch</span>
        <h1 class="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 sm:mb-6">Contact Us</h1>
        <p class="text-text-medium text-base sm:text-lg max-w-2xl mx-auto px-4">
          Let's discuss your vision and explore how we can bring your architectural dreams to life.
        </p>
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-10 sm:py-16 lg:py-24 bg-white px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <!-- Contact Form -->
          <div class="bg-sand-light rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 order-2 lg:order-1">
            <h2 class="font-display text-2xl sm:text-3xl mb-2 sm:mb-3">Send a Message</h2>
            <p class="text-text-medium text-sm sm:text-base mb-6 sm:mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>

            <form @submit.prevent="submitForm" class="space-y-4 sm:space-y-6">
              <div>
                <label for="name" class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">Full Name *</label>
                <input
                  type="text"
                  id="name"
                  v-model="formData.name"
                  required
                  class="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-white border-0 rounded-xl text-text-dark placeholder-text-light focus:ring-2 focus:ring-clay transition-all text-sm sm:text-base"
                  placeholder="Your name"
                >
              </div>

              <div>
                <label for="email" class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">Email Address *</label>
                <input
                  type="email"
                  id="email"
                  v-model="formData.email"
                  required
                  class="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-white border-0 rounded-xl text-text-dark placeholder-text-light focus:ring-2 focus:ring-clay transition-all text-sm sm:text-base"
                  placeholder="your.email@example.com"
                >
              </div>

              <div>
                <label for="phone" class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  v-model="formData.phone"
                  class="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-white border-0 rounded-xl text-text-dark placeholder-text-light focus:ring-2 focus:ring-clay transition-all text-sm sm:text-base"
                  placeholder="+91 XXXXX XXXXX"
                >
              </div>

              <div>
                <label for="subject" class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  v-model="formData.subject"
                  required
                  class="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-white border-0 rounded-xl text-text-dark placeholder-text-light focus:ring-2 focus:ring-clay transition-all text-sm sm:text-base"
                  placeholder="How can we help you?"
                >
              </div>

              <div>
                <label for="message" class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">Message *</label>
                <textarea
                  id="message"
                  v-model="formData.message"
                  required
                  rows="4"
                  class="w-full px-4 sm:px-5 py-3 sm:py-3.5 bg-white border-0 rounded-xl text-text-dark placeholder-text-light focus:ring-2 focus:ring-clay transition-all resize-none text-sm sm:text-base"
                  placeholder="Tell us more about your project..."
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full py-3.5 sm:py-4 bg-earth text-white font-medium rounded-full hover:bg-clay transition-all disabled:bg-text-light disabled:cursor-not-allowed text-sm sm:text-base min-h-[48px]"
              >
                {{ isSubmitting ? 'Sending...' : 'Send Message' }}
              </button>

              <div v-if="submitMessage" :class="submitSuccess ? 'text-sage-dark' : 'text-clay-dark'" class="text-center font-medium bg-white rounded-xl p-3 sm:p-4 text-sm sm:text-base">
                {{ submitMessage }}
              </div>
            </form>
          </div>

          <!-- Contact Information -->
          <div class="order-1 lg:order-2">
            <h2 class="font-display text-2xl sm:text-3xl mb-6 sm:mb-8">Contact Information</h2>

            <div class="space-y-4 sm:space-y-6 mb-8 sm:mb-10">
              <!-- Address -->
              <div class="flex items-start gap-4 sm:gap-5">
                <div class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-clay to-clay-dark rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                    <circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-text-dark text-base sm:text-lg mb-0.5 sm:mb-1">Address</h3>
                  <p class="text-text-medium text-sm sm:text-base">{{ contactInfo.address }}</p>
                </div>
              </div>

              <!-- Email -->
              <div class="flex items-start gap-4 sm:gap-5">
                <div class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-clay to-clay-dark rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-text-dark text-base sm:text-lg mb-0.5 sm:mb-1">Email</h3>
                  <a :href="'mailto:' + contactInfo.email" class="text-text-medium hover:text-clay transition-colors text-sm sm:text-base break-all">{{ contactInfo.email }}</a>
                </div>
              </div>

              <!-- Phone -->
              <div class="flex items-start gap-4 sm:gap-5">
                <div class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-clay to-clay-dark rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-text-dark text-base sm:text-lg mb-0.5 sm:mb-1">Phone</h3>
                  <a :href="'tel:' + contactInfo.phone.replace(/\s/g, '')" class="text-text-medium hover:text-clay transition-colors text-sm sm:text-base">{{ contactInfo.phone }}</a>
                </div>
              </div>

              <!-- Hours -->
              <div class="flex items-start gap-4 sm:gap-5">
                <div class="w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-clay to-clay-dark rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <div>
                  <h3 class="font-medium text-text-dark text-base sm:text-lg mb-0.5 sm:mb-1">Business Hours</h3>
                  <p class="text-text-medium text-sm sm:text-base">Monday - Saturday: 9:00 AM - 6:00 PM</p>
                  <p class="text-text-light text-xs sm:text-sm">Sunday: Closed</p>
                </div>
              </div>
            </div>

            <!-- Why Choose Us Box -->
            <div class="bg-sage rounded-2xl sm:rounded-3xl p-6 sm:p-8">
              <h3 class="font-display text-lg sm:text-xl text-white mb-4 sm:mb-5">Why Choose Us?</h3>
              <ul class="space-y-3 sm:space-y-4">
                <li class="flex items-center gap-2.5 sm:gap-3 text-white/90 text-sm sm:text-base">
                  <div class="w-5 h-5 sm:w-6 sm:h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  25+ Years of Experience
                </li>
                <li class="flex items-center gap-2.5 sm:gap-3 text-white/90 text-sm sm:text-base">
                  <div class="w-5 h-5 sm:w-6 sm:h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  Trusted by Government & Private Clients
                </li>
                <li class="flex items-center gap-2.5 sm:gap-3 text-white/90 text-sm sm:text-base">
                  <div class="w-5 h-5 sm:w-6 sm:h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg class="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                  </div>
                  World-Class Quality Standards
                </li>
              </ul>
            </div>

            <!-- Social Links -->
            <div class="mt-8 sm:mt-10">
              <p class="text-xs sm:text-sm text-text-light mb-3 sm:mb-4">Follow us</p>
              <div class="flex gap-3 sm:gap-4">
                <a href="#" class="w-10 h-10 sm:w-12 sm:h-12 bg-sand rounded-full flex items-center justify-center text-text-medium hover:bg-clay hover:text-white transition-all">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="2" y="2" width="20" height="20" rx="5"/>
                    <circle cx="12" cy="12" r="4"/>
                    <circle cx="18" cy="6" r="1.5" fill="currentColor"/>
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 sm:w-12 sm:h-12 bg-sand rounded-full flex items-center justify-center text-text-medium hover:bg-clay hover:text-white transition-all">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                    <rect x="2" y="9" width="4" height="12"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
                <a href="#" class="w-10 h-10 sm:w-12 sm:h-12 bg-sand rounded-full flex items-center justify-center text-text-medium hover:bg-clay hover:text-white transition-all">
                  <svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Map Section -->
    <section class="relative">
      <!-- Map Container with themed styling -->
      <div class="h-64 sm:h-80 lg:h-96 bg-sand relative overflow-hidden">
        <!-- Google Maps Embed -->
        <iframe
          :src="mapEmbedUrl"
          class="w-full h-full border-0"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Chamankar Group Location"
        ></iframe>

        <!-- Clickable Overlay for Mobile Deep Linking -->
        <a
          :href="mapDeepLink"
          target="_blank"
          rel="noopener noreferrer"
          class="absolute inset-0 lg:hidden"
          aria-label="Open in Maps App"
        ></a>
      </div>

      <!-- Open in Maps Button (visible on all devices) -->
      <div class="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-10">
        <a
          :href="mapDeepLink"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 bg-white text-earth font-medium text-xs sm:text-sm rounded-full shadow-lg hover:bg-earth hover:text-white transition-all"
        >
          <svg class="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          Get Directions
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useContact } from '@/composables/useContact'
import { useSiteContent } from '@/composables/useSiteContent'

const { submitContact } = useContact()
const { siteContent, fetchContent } = useSiteContent()

const formData = ref({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

const contactInfo = ref({
  address: 'Mumbai, Maharashtra, India',
  email: 'info@chamankar.com',
  phone: '+91 22 1234 5678'
})

// Map location - Default: BKC, Mumbai
const mapLocation = ref({
  lat: 19.0596,
  lng: 72.8656,
  name: 'Chamankar Group'
})

// Google Maps Embed URL
const mapEmbedUrl = computed(() => {
  const { lat, lng } = mapLocation.value
  return `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.0!2d${lng}!3d${lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDAzJzM0LjYiTiA3MsKwNTEnNTYuMiJF!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin`
})

// Deep link for opening in maps apps
const mapDeepLink = computed(() => {
  const { lat, lng, name } = mapLocation.value
  const encodedName = encodeURIComponent(name)
  // Universal link that works on iOS (Apple Maps), Android (Google Maps), and desktop browsers
  return `https://www.google.com/maps/search/?api=1&query=${lat},${lng}&query_place_id=${encodedName}`
})

const submitMessage = ref('')
const submitSuccess = ref(false)
const isSubmitting = ref(false)

const submitForm = async () => {
  isSubmitting.value = true
  try {
    await submitContact(formData.value)

    // Show success message
    submitSuccess.value = true
    submitMessage.value = 'Thank you for your message! We will get back to you soon.'

    // Reset form
    formData.value = {
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    }
  } catch (error) {
    submitSuccess.value = false
    submitMessage.value = 'Sorry, there was an error sending your message. Please try again.'
    console.error('Contact form error:', error)
  } finally {
    isSubmitting.value = false

    // Clear message after 5 seconds
    setTimeout(() => {
      submitMessage.value = ''
    }, 5000)
  }
}

onMounted(async () => {
  await fetchContent()
  if (siteContent.value) {
    contactInfo.value = {
      address: siteContent.value.contact_address || contactInfo.value.address,
      email: siteContent.value.contact_email || contactInfo.value.email,
      phone: siteContent.value.contact_phone || contactInfo.value.phone
    }
    // Update map location if available
    if (siteContent.value.map_lat && siteContent.value.map_lng) {
      mapLocation.value = {
        lat: parseFloat(siteContent.value.map_lat),
        lng: parseFloat(siteContent.value.map_lng),
        name: siteContent.value.contact_address || mapLocation.value.name
      }
    }
  }
})
</script>

<style scoped>
</style>
