<template>
  <div class="about">
    <!-- Page Header -->
    <section class="relative pt-24 sm:pt-28 lg:pt-32 pb-12 sm:pb-16 lg:pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-sand-light to-sand">
      <div class="max-w-7xl mx-auto text-center">
        <span class="section-tag">Our Story</span>
        <h1 class="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal mb-4 sm:mb-6">About Chamankar Group</h1>
        <p class="text-text-medium text-base sm:text-lg max-w-2xl mx-auto px-4">
          For over 25 years, we've been the pioneering force behind Mumbai's rapidly changing skyline.
        </p>
      </div>
    </section>

    <!-- Company Introduction -->
    <section class="py-16 sm:py-20 lg:py-32 bg-white px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <span class="section-tag">Who We Are</span>
            <h2 class="section-title text-3xl sm:text-4xl md:text-5xl">Building Dreams That Flow With Life</h2>
            <p class="text-text-medium text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
              {{ content.about.intro }}
            </p>
            <p class="text-text-medium text-sm sm:text-base leading-relaxed">
              At Chamankar Group, we believe architecture should breathe. Our designs embrace natural forms and organic materials, creating spaces that feel alive and connected to their environment.
            </p>
          </div>
          <div class="hidden sm:grid grid-cols-2 gap-4 sm:gap-6">
            <div class="aspect-[3/4] rounded-[60px] sm:rounded-[80px] lg:rounded-[100px] overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=533&fit=crop"
                alt="Residential Architecture"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="aspect-[3/4] rounded-[60px] sm:rounded-[80px] lg:rounded-[100px] overflow-hidden shadow-xl mt-8 sm:mt-12">
              <img
                src="https://images.unsplash.com/photo-1600573472592-401b489a3cdc?w=400&h=533&fit=crop"
                alt="Modern Building Design"
                class="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Vision - Curved Section -->
    <section class="relative py-20 sm:py-28 lg:py-40 bg-sage overflow-hidden">
      <!-- Top Curve -->
      <div class="absolute top-0 left-0 right-0 h-12 sm:h-16 lg:h-24 bg-white" style="border-radius: 0 0 50% 50%;"></div>
      <!-- Bottom Curve -->
      <div class="absolute bottom-0 left-0 right-0 h-12 sm:h-16 lg:h-24 bg-sand-light" style="border-radius: 50% 50% 0 0;"></div>

      <div class="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="inline-block text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-white/70 mb-3 sm:mb-4">{{ content.about.vision.title }}</span>
        <div class="space-y-4 sm:space-y-6">
          <p v-for="(paragraph, index) in content.about.vision.paragraphs" :key="index" class="text-white/90 text-base sm:text-lg leading-relaxed">
            {{ paragraph }}
          </p>
        </div>
      </div>
    </section>

    <!-- Our Values -->
    <section class="py-16 sm:py-20 lg:py-32 bg-sand-light px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-xl mx-auto mb-10 sm:mb-12 lg:mb-16 px-4">
          <span class="section-tag">What Drives Us</span>
          <h2 class="section-title text-3xl sm:text-4xl md:text-5xl">Our Core Values</h2>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8">
          <div v-for="value in content.about.values" :key="value.id" class="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div class="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-clay to-clay-dark rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-5 lg:mb-6">
              <svg v-if="value.title === 'Excellence'" class="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              <svg v-else-if="value.title === 'Innovation'" class="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
              </svg>
              <svg v-else-if="value.title === 'Trust'" class="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
              </svg>
              <svg v-else class="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <h3 class="font-display text-base sm:text-lg lg:text-xl font-medium mb-2 sm:mb-3">{{ value.title }}</h3>
            <p class="text-text-medium text-xs sm:text-sm leading-relaxed">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Expertise -->
    <section class="py-16 sm:py-20 lg:py-32 bg-white px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-xl mx-auto mb-10 sm:mb-12 lg:mb-16 px-4">
          <span class="section-tag">What We Do</span>
          <h2 class="section-title text-3xl sm:text-4xl md:text-5xl">Our Expertise</h2>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          <div v-for="expertise in content.about.expertise" :key="expertise.id" class="bg-sand-light rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-10 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
            <div class="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gradient-to-br from-sage to-sage-dark rounded-full flex items-center justify-center mb-4 sm:mb-5 lg:mb-6">
              <svg v-if="expertise.title === 'Residential'" class="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              </svg>
              <svg v-else-if="expertise.title === 'Commercial'" class="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <rect x="4" y="2" width="16" height="20" rx="2"/>
                <path d="M9 22v-4h6v4"/>
              </svg>
              <svg v-else class="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2">
                <path d="M3 21h18M9 21V8l-6 4v9M9 8l6-4 6 4M15 21V8"/>
              </svg>
            </div>
            <h3 class="font-display text-xl sm:text-2xl font-medium mb-3 sm:mb-4">{{ expertise.title }}</h3>
            <p class="text-text-medium text-sm sm:text-base leading-relaxed">{{ expertise.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline Section -->
    <section class="py-16 sm:py-20 lg:py-32 bg-earth text-white px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <div class="text-center max-w-xl mx-auto mb-10 sm:mb-12 lg:mb-16 px-4">
          <span class="inline-block text-[10px] sm:text-xs font-semibold tracking-widest uppercase text-clay mb-3 sm:mb-4">Our Journey</span>
          <h2 class="font-display text-3xl sm:text-4xl md:text-5xl font-normal mb-3 sm:mb-5">25+ Years of Excellence</h2>
        </div>
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-8 text-center">
          <div v-for="item in timeline" :key="item.label" class="bg-white/10 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8">
            <div class="font-display text-3xl sm:text-4xl lg:text-5xl text-clay mb-2 sm:mb-3">{{ item.number }}</div>
            <div class="text-white/70 text-xs sm:text-sm lg:text-base">{{ item.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-16 sm:py-20 lg:py-32 bg-gradient-to-br from-clay to-clay-dark text-center px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto">
        <h2 class="font-display text-3xl sm:text-4xl lg:text-5xl text-white mb-4 sm:mb-6">
          Want to Learn More?
        </h2>
        <p class="text-white/90 text-base sm:text-lg mb-8 sm:mb-10">
          Discover our portfolio of exceptional projects
        </p>
        <router-link
          to="/projects"
          class="inline-block px-8 sm:px-10 lg:px-12 py-4 sm:py-5 bg-white text-clay-dark font-semibold rounded-full hover:-translate-y-1 hover:shadow-xl transition-all text-sm sm:text-base"
        >
          View Our Projects
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useSiteContent } from '@/composables/useSiteContent'

const { siteContent, fetchContent } = useSiteContent()

const timeline = ref([
  { number: '1999', label: 'Founded' },
  { number: '150+', label: 'Projects' },
  { number: '40+', label: 'Awards' },
  { number: '200+', label: 'Team Members' }
])

const content = ref({
  about: {
    intro: 'M/s CHAMANKAR GROUP is a reputed & trusted name in the construction industry since more than 25 years. Over the years, the company has been the pioneering force behind the rapidly changing skyline of Mumbai, with developments that span the residential, retail, commercial & Government sectors.',
    vision: {
      title: 'Our Vision',
      paragraphs: [
        'Aspiring for world class living standards and contemporary work places come within reach of all. We at CHAMANKAR GROUP expand horizons, link people and organizations, set up new trends, and continually enhance the values entrusted to our care.',
        'Our aim is setting up of comfortable and luxurious dwelling spheres that impeccably match world class infrastructures.',
        'We create infrastructure which is a perfect blend of beauty and strength. At the core the idea still remains to provide a world class experience to our ever valued customers.'
      ]
    },
    values: [
      { id: 1, title: 'Excellence', description: 'Committed to delivering exceptional quality in every project we undertake.' },
      { id: 2, title: 'Innovation', description: 'Pioneering new trends and expanding horizons in construction.' },
      { id: 3, title: 'Trust', description: 'Building lasting relationships based on reliability and integrity.' },
      { id: 4, title: 'Sustainability', description: 'Creating spaces that respect and harmonize with nature.' }
    ],
    expertise: [
      { id: 1, title: 'Residential', description: 'Creating luxurious living spaces that become perfect homes for families.' },
      { id: 2, title: 'Commercial', description: 'Developing modern workspaces that inspire productivity and success.' },
      { id: 3, title: 'Government', description: 'Delivering prestigious government projects with architectural excellence.' }
    ]
  }
})

onMounted(async () => {
  await fetchContent()

  if (siteContent.value) {
    content.value = {
      about: {
        intro: siteContent.value.about_intro || content.value.about.intro,
        vision: {
          title: siteContent.value.about_vision_title || content.value.about.vision.title,
          paragraphs: siteContent.value.about_vision_paragraphs || content.value.about.vision.paragraphs
        },
        values: siteContent.value.values || content.value.about.values,
        expertise: siteContent.value.expertise || content.value.about.expertise
      }
    }
    if (siteContent.value.timeline) {
      timeline.value = siteContent.value.timeline
    }
  }
})
</script>

<style scoped>
</style>
