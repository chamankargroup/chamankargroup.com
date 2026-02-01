<template>
  <div class="admin min-h-screen bg-sand-light">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1 class="font-display text-2xl text-text-dark">Admin Panel</h1>
        <div class="flex items-center gap-4">
          <span class="text-sm text-text-medium">{{ user?.email }}</span>
          <button @click="handleLogout" class="px-4 py-2 bg-earth text-white rounded-full text-sm hover:bg-clay transition-colors">
            Logout
          </button>
        </div>
      </div>
    </header>

    <!-- Tabs -->
    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-6">
        <nav class="flex gap-8">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="py-4 text-sm font-medium border-b-2 transition-colors"
            :class="activeTab === tab.id ? 'border-clay text-clay' : 'border-transparent text-text-medium hover:text-text-dark'"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Content -->
    <main class="max-w-7xl mx-auto px-6 py-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block w-8 h-8 border-4 border-clay border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-4 text-text-medium">Loading...</p>
      </div>

      <!-- Site Content Tab -->
      <div v-else-if="activeTab === 'content'" class="space-y-8">
        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <h2 class="font-display text-xl mb-6">Hero Section</h2>
          <div class="grid gap-4">
            <div>
              <label class="block text-sm font-medium text-text-dark mb-2">Title</label>
              <input v-model="content.hero_title" class="w-full px-4 py-3 border border-sand rounded-xl" placeholder="Hero title">
            </div>
            <div>
              <label class="block text-sm font-medium text-text-dark mb-2">Subtitle</label>
              <input v-model="content.hero_subtitle" class="w-full px-4 py-3 border border-sand rounded-xl" placeholder="Hero subtitle">
            </div>
            <div>
              <label class="block text-sm font-medium text-text-dark mb-2">Description</label>
              <textarea v-model="content.hero_description" rows="3" class="w-full px-4 py-3 border border-sand rounded-xl" placeholder="Hero description"></textarea>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <h2 class="font-display text-xl mb-6">About Section</h2>
          <div class="grid gap-4">
            <div>
              <label class="block text-sm font-medium text-text-dark mb-2">Introduction</label>
              <textarea v-model="content.about_intro" rows="4" class="w-full px-4 py-3 border border-sand rounded-xl" placeholder="About introduction"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-text-dark mb-2">Vision Title</label>
              <input v-model="content.about_vision_title" class="w-full px-4 py-3 border border-sand rounded-xl" placeholder="Vision title">
            </div>
            <div>
              <label class="block text-sm font-medium text-text-dark mb-2">Vision Description</label>
              <textarea v-model="content.about_vision_text" rows="4" class="w-full px-4 py-3 border border-sand rounded-xl" placeholder="Vision description"></textarea>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <h2 class="font-display text-xl mb-6">Contact Information</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-text-dark mb-2">Email</label>
              <input v-model="content.contact_email" class="w-full px-4 py-3 border border-sand rounded-xl" placeholder="info@example.com">
            </div>
            <div>
              <label class="block text-sm font-medium text-text-dark mb-2">Phone</label>
              <input v-model="content.contact_phone" class="w-full px-4 py-3 border border-sand rounded-xl" placeholder="+91 1234567890">
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-text-dark mb-2">Address</label>
              <input v-model="content.contact_address" class="w-full px-4 py-3 border border-sand rounded-xl" placeholder="Business address">
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button @click="saveContent" :disabled="saving" class="px-8 py-3 bg-earth text-white rounded-full font-medium hover:bg-clay transition-colors disabled:opacity-50">
            {{ saving ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </div>

      <!-- Projects Tab -->
      <div v-else-if="activeTab === 'projects'" class="space-y-6">
        <div class="flex justify-between items-center">
          <h2 class="font-display text-xl">Manage Projects</h2>
          <button @click="openProjectModal()" class="px-6 py-2 bg-earth text-white rounded-full text-sm font-medium hover:bg-clay transition-colors">
            + Add Project
          </button>
        </div>

        <div class="grid gap-4">
          <div v-for="project in projects" :key="project.id" class="bg-white rounded-2xl p-6 shadow-sm flex items-center gap-6">
            <div class="w-24 h-24 bg-sand rounded-xl overflow-hidden flex-shrink-0">
              <img v-if="project.image" :src="project.image" class="w-full h-full object-cover" :alt="project.name">
              <div v-else class="w-full h-full flex items-center justify-center text-text-light">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <h3 class="font-medium text-text-dark truncate">{{ project.name }}</h3>
              <p class="text-sm text-text-medium">{{ project.location }}</p>
              <span class="inline-block mt-2 px-3 py-1 bg-clay/10 text-clay text-xs rounded-full">{{ project.type }}</span>
            </div>
            <div class="flex gap-2">
              <button @click="openProjectModal(project)" class="p-2 text-text-medium hover:text-clay transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button @click="confirmDelete(project)" class="p-2 text-text-medium hover:text-red-500 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </div>
          </div>

          <div v-if="projects.length === 0" class="text-center py-12 bg-white rounded-2xl">
            <p class="text-text-medium">No projects yet. Add your first project!</p>
          </div>
        </div>
      </div>

      <!-- Contact Submissions Tab -->
      <div v-else-if="activeTab === 'messages'" class="space-y-6">
        <h2 class="font-display text-xl">Contact Messages</h2>

        <div class="space-y-4">
          <div v-for="submission in submissions" :key="submission.id" class="bg-white rounded-2xl p-6 shadow-sm" :class="{ 'opacity-60': submission.read }">
            <div class="flex justify-between items-start mb-4">
              <div>
                <h3 class="font-medium text-text-dark">{{ submission.name }}</h3>
                <p class="text-sm text-text-medium">{{ submission.email }} • {{ submission.phone || 'No phone' }}</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-xs text-text-light">{{ formatDate(submission.created_at) }}</span>
                <span v-if="!submission.read" class="w-2 h-2 bg-clay rounded-full"></span>
              </div>
            </div>
            <p class="text-sm font-medium text-text-dark mb-2">{{ submission.subject }}</p>
            <p class="text-sm text-text-medium whitespace-pre-line">{{ submission.message }}</p>
            <div class="mt-4 flex gap-2">
              <button v-if="!submission.read" @click="markMessageRead(submission.id)" class="text-sm text-clay hover:underline">
                Mark as read
              </button>
              <button @click="deleteMessage(submission.id)" class="text-sm text-red-500 hover:underline">
                Delete
              </button>
            </div>
          </div>

          <div v-if="submissions.length === 0" class="text-center py-12 bg-white rounded-2xl">
            <p class="text-text-medium">No messages yet.</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Project Modal -->
    <Teleport to="body">
      <div v-if="showProjectModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" @click.self="showProjectModal = false">
        <div class="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-6 border-b border-sand">
            <h3 class="font-display text-xl">{{ editingProject ? 'Edit Project' : 'Add Project' }}</h3>
          </div>
          <form @submit.prevent="saveProject" class="p-6 space-y-4">
            <div>
              <label class="block text-sm font-medium text-text-dark mb-2">Project Name *</label>
              <input v-model="projectForm.name" required class="w-full px-4 py-3 border border-sand rounded-xl">
            </div>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-dark mb-2">Location *</label>
                <input v-model="projectForm.location" required class="w-full px-4 py-3 border border-sand rounded-xl">
              </div>
              <div>
                <label class="block text-sm font-medium text-text-dark mb-2">Type *</label>
                <select v-model="projectForm.type" required class="w-full px-4 py-3 border border-sand rounded-xl">
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Government">Government</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-text-dark mb-2">Description</label>
              <textarea v-model="projectForm.description" rows="4" class="w-full px-4 py-3 border border-sand rounded-xl"></textarea>
            </div>
            <div class="grid md:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-text-dark mb-2">Status</label>
                <select v-model="projectForm.status" class="w-full px-4 py-3 border border-sand rounded-xl">
                  <option value="">Select status</option>
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-text-dark mb-2">Completion Date</label>
                <input v-model="projectForm.completion_date" class="w-full px-4 py-3 border border-sand rounded-xl" placeholder="e.g., December 2024">
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium text-text-dark mb-2">Project Image</label>
              <div class="flex items-center gap-4">
                <div v-if="projectForm.image" class="w-24 h-24 rounded-xl overflow-hidden">
                  <img :src="projectForm.image" class="w-full h-full object-cover">
                </div>
                <label class="px-4 py-2 border border-clay text-clay rounded-full cursor-pointer hover:bg-clay hover:text-white transition-colors">
                  <span>{{ projectForm.image ? 'Change Image' : 'Upload Image' }}</span>
                  <input type="file" accept="image/*" class="hidden" @change="handleImageUpload">
                </label>
              </div>
            </div>
            <div class="flex justify-end gap-4 pt-4">
              <button type="button" @click="showProjectModal = false" class="px-6 py-2 border border-sand rounded-full text-text-medium hover:bg-sand transition-colors">
                Cancel
              </button>
              <button type="submit" :disabled="savingProject" class="px-6 py-2 bg-earth text-white rounded-full hover:bg-clay transition-colors disabled:opacity-50">
                {{ savingProject ? 'Saving...' : 'Save Project' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useProjects } from '../composables/useProjects'
import { useSiteContent } from '../composables/useSiteContent'
import { useContact } from '../composables/useContact'

const router = useRouter()
const { user, logout, getUser } = useAuth()
const { projects, fetchProjects, createProject, updateProject, deleteProject, uploadImage } = useProjects()
const { siteContent, fetchContent, updateContent } = useSiteContent()
const { submissions, fetchSubmissions, markAsRead, deleteSubmission } = useContact()

const tabs = [
  { id: 'content', name: 'Site Content' },
  { id: 'projects', name: 'Projects' },
  { id: 'messages', name: 'Messages' }
]

const activeTab = ref('content')
const loading = ref(true)
const saving = ref(false)
const savingProject = ref(false)

const content = ref({
  hero_title: '',
  hero_subtitle: '',
  hero_description: '',
  about_intro: '',
  about_vision_title: '',
  about_vision_text: '',
  contact_email: '',
  contact_phone: '',
  contact_address: ''
})

const showProjectModal = ref(false)
const editingProject = ref(null)
const projectForm = ref({
  name: '',
  location: '',
  type: 'Residential',
  description: '',
  status: '',
  completion_date: '',
  image: ''
})

onMounted(async () => {
  const currentUser = await getUser()
  if (!currentUser) {
    router.replace('/admin/login')
    return
  }

  await Promise.all([
    fetchContent(),
    fetchProjects(),
    fetchSubmissions()
  ])

  if (siteContent.value) {
    content.value = { ...content.value, ...siteContent.value }
  }

  loading.value = false
})

const handleLogout = async () => {
  await logout()
  router.replace('/admin/login')
}

const saveContent = async () => {
  saving.value = true
  try {
    await updateContent(content.value)
    alert('Content saved successfully!')
  } catch (error) {
    alert('Error saving content: ' + error.message)
  } finally {
    saving.value = false
  }
}

const openProjectModal = (project = null) => {
  editingProject.value = project
  if (project) {
    projectForm.value = { ...project }
  } else {
    projectForm.value = {
      name: '',
      location: '',
      type: 'Residential',
      description: '',
      status: '',
      completion_date: '',
      image: ''
    }
  }
  showProjectModal.value = true
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  try {
    const url = await uploadImage(file)
    projectForm.value.image = url
  } catch (error) {
    alert('Error uploading image: ' + error.message)
  }
}

const saveProject = async () => {
  savingProject.value = true
  try {
    if (editingProject.value) {
      await updateProject(editingProject.value.id, projectForm.value)
    } else {
      await createProject(projectForm.value)
    }
    showProjectModal.value = false
  } catch (error) {
    alert('Error saving project: ' + error.message)
  } finally {
    savingProject.value = false
  }
}

const confirmDelete = async (project) => {
  if (confirm(`Delete "${project.name}"?`)) {
    try {
      await deleteProject(project.id)
    } catch (error) {
      alert('Error deleting project: ' + error.message)
    }
  }
}

const markMessageRead = async (id) => {
  await markAsRead(id)
}

const deleteMessage = async (id) => {
  if (confirm('Delete this message?')) {
    await deleteSubmission(id)
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}
</script>

<style scoped>
.animate-spin {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>
