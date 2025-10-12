<template>
  <div class="admin min-h-screen bg-gray-100">
    <!-- Admin Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div class="flex justify-between items-center">
          <h1 class="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div class="flex items-center space-x-4">
            <router-link to="/" class="text-primary-600 hover:text-primary-700">View Site</router-link>
            <button @click="handleLogout" class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors">
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Add/Edit Project Form -->
      <div class="bg-white rounded-lg shadow-lg p-6 mb-8">
        <h2 class="text-xl font-bold text-gray-900 mb-6">{{ editingProject ? 'Edit Project' : 'Add New Project' }}</h2>

        <form @submit.prevent="saveProject" class="space-y-4">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Project Name *</label>
              <input
                type="text"
                v-model="projectForm.name"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter project name"
              >
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Location *</label>
              <input
                type="text"
                v-model="projectForm.location"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                placeholder="Enter location"
              >
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Project Type *</label>
            <select
              v-model="projectForm.type"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select type</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Government">Government</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Description *</label>
            <textarea
              v-model="projectForm.description"
              required
              rows="4"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="Enter project description"
            ></textarea>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Project Image</label>
            <input
              type="file"
              @change="handleImageUpload"
              accept="image/*"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
            <p class="mt-1 text-sm text-gray-500">Upload a project image (JPG, PNG, etc.)</p>

            <div v-if="projectForm.image" class="mt-4">
              <p class="text-sm font-medium text-gray-700 mb-2">Current Image:</p>
              <img :src="projectForm.image" alt="Project preview" class="w-48 h-32 object-cover rounded-lg border border-gray-300">
            </div>
          </div>

          <div class="flex space-x-4">
            <button
              type="submit"
              class="bg-primary-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-700 transition-colors"
            >
              {{ editingProject ? 'Update Project' : 'Add Project' }}
            </button>

            <button
              v-if="editingProject"
              type="button"
              @click="cancelEdit"
              class="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>

      <!-- Projects List -->
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-bold text-gray-900 mb-6">Manage Projects ({{ projects.length }})</h2>

        <div v-if="projects.length === 0" class="text-center py-8 text-gray-500">
          No projects added yet. Add your first project above.
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="project in projects" :key="project.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <img v-if="project.image" :src="project.image" :alt="project.name" class="w-16 h-16 object-cover rounded">
                  <div v-else class="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-2xl">🏢</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm font-medium text-gray-900">{{ project.name }}</div>
                </td>
                <td class="px-6 py-4">
                  <div class="text-sm text-gray-500">{{ project.location }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-primary-100 text-primary-800">
                    {{ project.type }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button @click="editProject(project)" class="text-primary-600 hover:text-primary-900 mr-4">
                    Edit
                  </button>
                  <button @click="deleteProject(project.id)" class="text-red-600 hover:text-red-900">
                    Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Contact Form Submissions -->
      <div class="bg-white rounded-lg shadow-lg p-6 mt-8">
        <h2 class="text-xl font-bold text-gray-900 mb-6">Contact Form Submissions ({{ submissions.length }})</h2>

        <div v-if="submissions.length === 0" class="text-center py-8 text-gray-500">
          No submissions yet.
        </div>

        <div v-else class="space-y-4">
          <div v-for="(submission, index) in submissions" :key="index" class="border border-gray-200 rounded-lg p-4">
            <div class="flex justify-between items-start mb-2">
              <div>
                <h3 class="font-semibold text-gray-900">{{ submission.name }}</h3>
                <p class="text-sm text-gray-600">{{ submission.email }} {{ submission.phone ? '• ' + submission.phone : '' }}</p>
              </div>
              <span class="text-xs text-gray-500">{{ formatDate(submission.timestamp) }}</span>
            </div>
            <p class="font-medium text-gray-700 mb-1">{{ submission.subject }}</p>
            <p class="text-gray-600 text-sm">{{ submission.message }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const projects = ref([])
const submissions = ref([])
const editingProject = ref(null)

const projectForm = ref({
  name: '',
  location: '',
  type: '',
  description: '',
  image: ''
})

const loadProjects = () => {
  const storedProjects = localStorage.getItem('chamankarProjects')
  if (storedProjects) {
    projects.value = JSON.parse(storedProjects)
  }
}

const loadSubmissions = () => {
  const storedSubmissions = localStorage.getItem('contactSubmissions')
  if (storedSubmissions) {
    submissions.value = JSON.parse(storedSubmissions).reverse()
  }
}

const handleImageUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    const reader = new FileReader()
    reader.onload = (e) => {
      projectForm.value.image = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const saveProject = () => {
  if (editingProject.value) {
    // Update existing project
    const index = projects.value.findIndex(p => p.id === editingProject.value.id)
    if (index !== -1) {
      projects.value[index] = {
        ...projectForm.value,
        id: editingProject.value.id
      }
    }
    editingProject.value = null
  } else {
    // Add new project
    const newProject = {
      ...projectForm.value,
      id: Date.now()
    }
    projects.value.push(newProject)
  }

  // Save to localStorage
  localStorage.setItem('chamankarProjects', JSON.stringify(projects.value))

  // Reset form
  projectForm.value = {
    name: '',
    location: '',
    type: '',
    description: '',
    image: ''
  }

  loadProjects()
}

const editProject = (project) => {
  editingProject.value = project
  projectForm.value = { ...project }
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const cancelEdit = () => {
  editingProject.value = null
  projectForm.value = {
    name: '',
    location: '',
    type: '',
    description: '',
    image: ''
  }
}

const deleteProject = (id) => {
  if (confirm('Are you sure you want to delete this project?')) {
    projects.value = projects.value.filter(p => p.id !== id)
    localStorage.setItem('chamankarProjects', JSON.stringify(projects.value))
  }
}

const handleLogout = () => {
  localStorage.removeItem('adminAuth')
  router.push('/admin/login')
}

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString()
}

onMounted(() => {
  loadProjects()
  loadSubmissions()
})
</script>

<style scoped>
</style>
