<template>
  <div class="not-found">
    <div class="content">
      <!-- Decorative Architecture Icon -->
      <div class="icon-wrapper">
        <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <!-- Building outline -->
          <rect x="20" y="40" width="80" height="60" stroke="currentColor" stroke-width="2" fill="none"/>
          <!-- Roof -->
          <path d="M10 40 L60 10 L110 40" stroke="currentColor" stroke-width="2" fill="none"/>
          <!-- Door -->
          <rect x="50" y="70" width="20" height="30" stroke="currentColor" stroke-width="2" fill="none"/>
          <!-- Windows -->
          <rect x="30" y="50" width="15" height="15" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <rect x="75" y="50" width="15" height="15" stroke="currentColor" stroke-width="1.5" fill="none"/>
          <!-- X mark overlay -->
          <line x1="25" y1="25" x2="95" y2="95" stroke="#c4936a" stroke-width="3" stroke-linecap="round"/>
          <line x1="95" y1="25" x2="25" y2="95" stroke="#c4936a" stroke-width="3" stroke-linecap="round"/>
        </svg>
      </div>

      <span class="error-code">404</span>
      <h1 class="title">Page Not Found</h1>
      <p class="description">
        The page you're looking for seems to have been demolished or never existed.
        Let's get you back to solid ground.
      </p>

      <div class="actions">
        <router-link to="/" class="btn-primary">
          <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/>
            <polyline points="9,22 9,12 15,12 15,22"/>
          </svg>
          Back to Home
        </router-link>
        <router-link to="/projects" class="btn-secondary">
          View Our Projects
        </router-link>
      </div>

      <!-- Quick Links -->
      <div class="quick-links">
        <p class="quick-links-title">Or explore:</p>
        <div class="links">
          <router-link to="/about">About Us</router-link>
          <router-link to="/projects">Projects</router-link>
          <router-link to="/contact">Contact</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(to bottom, #f8f6f3, #f0ebe4);
}

.content {
  text-align: center;
  max-width: 500px;
}

.icon-wrapper {
  width: 120px;
  height: 120px;
  margin: 0 auto 2rem;
  color: #5c5a56;
}

.icon-wrapper svg {
  width: 100%;
  height: 100%;
}

.error-code {
  display: block;
  font-family: 'Playfair Display', serif;
  font-size: 6rem;
  font-weight: 400;
  color: #c4936a;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 400;
  color: #2d2a26;
  margin-bottom: 1rem;
}

.description {
  color: #6b6965;
  font-size: 1rem;
  line-height: 1.7;
  margin-bottom: 2.5rem;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  margin-bottom: 3rem;
}

@media (min-width: 480px) {
  .actions {
    flex-direction: row;
    justify-content: center;
  }
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  background: #8b5e3c;
  color: white;
  font-size: 0.9rem;
  font-weight: 500;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary:hover {
  background: #7a5235;
  transform: translateY(-2px);
}

.btn-primary svg {
  width: 18px;
  height: 18px;
}

.btn-secondary {
  display: inline-flex;
  align-items: center;
  padding: 0.875rem 1.75rem;
  background: transparent;
  color: #5c5a56;
  font-size: 0.9rem;
  font-weight: 500;
  border: 1.5px solid #d4cfc7;
  border-radius: 9999px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  border-color: #8b5e3c;
  color: #8b5e3c;
}

.quick-links {
  padding-top: 2rem;
  border-top: 1px solid #e5e0d9;
}

.quick-links-title {
  font-size: 0.85rem;
  color: #8a847e;
  margin-bottom: 0.75rem;
}

.links {
  display: flex;
  justify-content: center;
  gap: 2rem;
}

.links a {
  color: #5c5a56;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.2s ease;
}

.links a:hover {
  color: #c4936a;
}
</style>
