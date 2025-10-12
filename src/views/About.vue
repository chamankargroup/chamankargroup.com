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
            M/s CHAMANKAR GROUP is a reputed & trusted name in the construction industry since more than 25 years.
            Over the years, the company has been the pioneering force behind the rapidly changing skyline of Mumbai,
            with developments that span the residential, retail, commercial & Government sectors.
          </p>
        </div>
      </div>
    </section>

    <!-- Our Vision -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-4xl mx-auto">
          <h2 class="text-3xl font-bold text-gray-900 mb-6 text-center">Our Vision</h2>
          <div class="bg-white p-8 rounded-lg shadow-lg">
            <p class="text-lg text-gray-700 leading-relaxed mb-4">
              Aspiring for world class living standards and contemporary work places come within reach of all.
              We at CHAMANKAR GROUP expand horizons, link people and organizations, set up new trends,
              and continually enhance the values entrusted to our care.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed mb-4">
              Our aim is setting up of comfortable and luxurious dwelling spheres that impeccably match world class infrastructures.
              We aspire to create establishments that give our customers the joy of owning a paradise.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed mb-4">
              Our true satisfaction comes through a million smiles of our customers we have generated over the years.
              The benchmarks set by Chamankar Group in residential as well as commercial estate development have been extraordinary,
              and we continually aspire to beat our own standards, raising them to a new level.
            </p>
            <p class="text-lg text-gray-700 leading-relaxed">
              We create infrastructure which is a perfect blend of beauty and strength. At the core the idea still remains
              to provide a world class experience to our ever valued customers.
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
          <div class="text-center p-6">
            <div class="text-5xl mb-4">🎯</div>
            <h3 class="text-xl font-bold mb-3">Excellence</h3>
            <p class="text-gray-600">Committed to delivering exceptional quality in every project we undertake.</p>
          </div>
          <div class="text-center p-6">
            <div class="text-5xl mb-4">💡</div>
            <h3 class="text-xl font-bold mb-3">Innovation</h3>
            <p class="text-gray-600">Pioneering new trends and expanding horizons in construction.</p>
          </div>
          <div class="text-center p-6">
            <div class="text-5xl mb-4">🤝</div>
            <h3 class="text-xl font-bold mb-3">Trust</h3>
            <p class="text-gray-600">Building lasting relationships based on reliability and integrity.</p>
          </div>
          <div class="text-center p-6">
            <div class="text-5xl mb-4">😊</div>
            <h3 class="text-xl font-bold mb-3">Customer Satisfaction</h3>
            <p class="text-gray-600">Your happiness is our true success measure.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Expertise -->
    <section class="py-16 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 class="text-3xl font-bold text-gray-900 mb-12 text-center">Our Expertise</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-white p-8 rounded-lg shadow-lg">
            <div class="text-4xl mb-4">🏘️</div>
            <h3 class="text-xl font-bold mb-3">Residential</h3>
            <p class="text-gray-600">Creating luxurious living spaces that become perfect homes for families.</p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-lg">
            <div class="text-4xl mb-4">🏢</div>
            <h3 class="text-xl font-bold mb-3">Commercial</h3>
            <p class="text-gray-600">Developing modern workspaces that inspire productivity and success.</p>
          </div>
          <div class="bg-white p-8 rounded-lg shadow-lg">
            <div class="text-4xl mb-4">🏛️</div>
            <h3 class="text-xl font-bold mb-3">Government</h3>
            <p class="text-gray-600">Delivering prestigious government projects with architectural excellence.</p>
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
</script>

<style scoped>
</style>
