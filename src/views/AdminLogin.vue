<template>
  <div class="admin-login min-h-screen bg-sand-light flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-3xl shadow-lg p-8">
        <div class="text-center mb-8">
          <h2 class="font-display text-3xl text-text-dark">Admin Login</h2>
          <p class="mt-2 text-text-medium">Sign in to manage your website</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-text-dark mb-2">Email</label>
            <input
              type="email"
              id="email"
              v-model="credentials.email"
              required
              class="w-full px-4 py-3 border border-sand rounded-xl focus:ring-2 focus:ring-clay focus:border-transparent"
              placeholder="admin@example.com"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-text-dark mb-2">Password</label>
            <input
              type="password"
              id="password"
              v-model="credentials.password"
              required
              class="w-full px-4 py-3 border border-sand rounded-xl focus:ring-2 focus:ring-clay focus:border-transparent"
              placeholder="Enter password"
            >
          </div>

          <div v-if="errorMessage" class="text-red-600 text-sm text-center font-medium bg-red-50 p-3 rounded-xl">
            {{ errorMessage }}
          </div>

          <div v-if="successMessage" class="text-green-600 text-sm text-center font-medium bg-green-50 p-3 rounded-xl">
            {{ successMessage }}
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-earth text-white px-8 py-3 rounded-full font-medium hover:bg-clay transition-colors disabled:bg-text-light disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Signing In...' : 'Sign In' }}
          </button>
        </form>

        <div class="mt-6 text-center">
          <router-link to="/" class="text-sm text-clay hover:text-clay-dark">
            &larr; Back to Home
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = useRouter()
const { login } = useAuth()

const credentials = ref({
  email: '',
  password: ''
})

const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  try {
    await login(credentials.value.email, credentials.value.password)
    localStorage.setItem('adminAuth', 'true')
    successMessage.value = 'Login successful! Redirecting...'
    setTimeout(() => {
      router.replace('/admin')
    }, 500)
  } catch (error) {
    console.error('Login error:', error)
    errorMessage.value = error.message || 'Invalid email or password. Please try again.'
  } finally {
    isLoading.value = false
  }
}
</script>
