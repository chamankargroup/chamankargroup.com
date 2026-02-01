<template>
  <footer class="bg-text-dark text-white py-16 lg:py-20">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <!-- Footer Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <!-- Brand Column -->
        <div class="lg:col-span-1">
          <h3 class="font-display text-3xl mb-5">Chamankar Group</h3>
          <p class="text-white/60 text-sm leading-relaxed">
            Creating harmonious architecture that flows with life. Award-winning design studio based in Mumbai.
          </p>
        </div>

        <!-- Navigate Column -->
        <div>
          <h4 class="text-xs font-semibold tracking-widest uppercase text-clay mb-6">Navigate</h4>
          <ul class="space-y-3">
            <li>
              <router-link to="/projects" class="text-white/60 hover:text-white text-sm transition-colors">
                Projects
              </router-link>
            </li>
            <li>
              <router-link to="/about" class="text-white/60 hover:text-white text-sm transition-colors">
                About
              </router-link>
            </li>
            <li>
              <router-link to="/contact" class="text-white/60 hover:text-white text-sm transition-colors">
                Contact
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Services Column -->
        <div>
          <h4 class="text-xs font-semibold tracking-widest uppercase text-clay mb-6">Services</h4>
          <ul class="space-y-3">
            <li>
              <a href="#" class="text-white/60 hover:text-white text-sm transition-colors">
                Residential
              </a>
            </li>
            <li>
              <a href="#" class="text-white/60 hover:text-white text-sm transition-colors">
                Commercial
              </a>
            </li>
            <li>
              <a href="#" class="text-white/60 hover:text-white text-sm transition-colors">
                Government
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact Column -->
        <div>
          <h4 class="text-xs font-semibold tracking-widest uppercase text-clay mb-6">Contact</h4>
          <ul class="space-y-3">
            <li>
              <a href="mailto:info@chamankar.com" class="text-white/60 hover:text-white text-sm transition-colors">
                info@chamankar.com
              </a>
            </li>
            <li>
              <a href="tel:+912212345678" class="text-white/60 hover:text-white text-sm transition-colors">
                +91 22 1234 5678
              </a>
            </li>
            <li>
              <span class="text-white/60 text-sm">
                Mumbai, India
              </span>
            </li>
          </ul>
        </div>
      </div>

      <!-- Footer Bottom -->
      <div class="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <span class="text-white/40 text-sm">
          &copy; {{ new Date().getFullYear() }} Chamankar Group
        </span>
        <div class="flex gap-6">
          <a href="#" class="text-white/40 hover:text-white text-sm transition-colors">Privacy</a>
          <a href="#" class="text-white/40 hover:text-white text-sm transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>

<style scoped>
</style>
