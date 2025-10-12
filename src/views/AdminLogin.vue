<template>
  <div class="admin-login min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-900">Admin Login</h2>
          <p class="mt-2 text-gray-600">Sign in to manage your website</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              id="username"
              v-model="credentials.username"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter username"
            >
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              v-model="credentials.password"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter password"
            >
          </div>

          <div v-if="errorMessage" class="text-red-600 text-sm text-center font-medium">
            {{ errorMessage }}
          </div>

          <div v-if="successMessage" class="text-green-600 text-sm text-center font-medium">
            {{ successMessage }}
          </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full bg-primary-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-primary-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {{ isLoading ? 'Signing In...' : 'Sign In' }}
          </button>
        </form>

        <div class="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p class="text-sm text-blue-800 font-medium mb-2">Demo Credentials:</p>
          <p class="text-sm text-blue-700">Username: <code class="bg-blue-100 px-2 py-1 rounded">admin</code></p>
          <p class="text-sm text-blue-700">Password: <code class="bg-blue-100 px-2 py-1 rounded">chamankar2024</code></p>
        </div>

        <div class="mt-6 text-center">
          <router-link to="/" class="text-sm text-primary-600 hover:text-primary-700">
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

const router = useRouter()

const credentials = ref({
  username: '',
  password: ''
})

const errorMessage = ref('')
const successMessage = ref('')
const isLoading = ref(false)

const handleLogin = async () => {
  console.log('Login attempt:', credentials.value.username)
  isLoading.value = true
  errorMessage.value = ''
  successMessage.value = ''

  // Simulate async operation
  await new Promise(resolve => setTimeout(resolve, 500))

  // Simple authentication (in production, use proper backend authentication)
  if (credentials.value.username === 'admin' && credentials.value.password === 'chamankar2024') {
    console.log('Login successful!')
    localStorage.setItem('adminAuth', 'true')
    successMessage.value = 'Login successful! Redirecting...'

    // Redirect after showing success message
    setTimeout(async () => {
      isLoading.value = false
      await router.replace('/admin')
    }, 800)
  } else {
    console.log('Login failed - invalid credentials')
    isLoading.value = false
    errorMessage.value = 'Invalid username or password. Please try again.'
    setTimeout(() => {
      errorMessage.value = ''
    }, 4000)
  }
}
</script>

<style scoped>
</style>
