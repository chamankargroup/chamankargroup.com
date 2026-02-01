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
        <nav class="flex gap-8 overflow-x-auto">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap"
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

      <!-- Hero Section Tab -->
      <div v-else-if="activeTab === 'hero'" class="space-y-6">
        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <h2 class="font-display text-xl mb-6">Hero Section</h2>
          <div class="grid gap-4">
            <div>
              <label class="block text-sm font-medium text-text-dark mb-2">Title (First Line)</label>
              <input v-model="content.hero_title" class="w-full px-4 py-3 border border-sand rounded-xl" placeholder="Where Nature Meets">
            </div>
            <div>
              <label class="block text-sm font-medium text-text-dark mb-2">Title (Highlighted)</label>
              <input v-model="content.hero_subtitle" class="w-full px-4 py-3 border border-sand rounded-xl" placeholder="Structure">
            </div>
            <div>
              <label class="block text-sm font-medium text-text-dark mb-2">Description</label>
              <textarea v-model="content.hero_description" rows="3" class="w-full px-4 py-3 border border-sand rounded-xl" placeholder="Hero description"></textarea>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <h2 class="font-display text-xl mb-6">Statistics</h2>
          <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div v-for="(stat, index) in content.stats" :key="index" class="border border-sand rounded-xl p-4">
              <label class="block text-xs font-medium text-text-light mb-1">Number</label>
              <input v-model="stat.number" class="w-full px-3 py-2 border border-sand rounded-lg text-lg font-display mb-2" placeholder="25+">
              <label class="block text-xs font-medium text-text-light mb-1">Label</label>
              <input v-model="stat.label" class="w-full px-3 py-2 border border-sand rounded-lg text-sm" placeholder="Years of Excellence">
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <h2 class="font-display text-xl mb-6">Services / Expertise (Home Page)</h2>
          <div class="space-y-4">
            <div v-for="(service, index) in content.services" :key="index" class="border border-sand rounded-xl p-4">
              <div class="flex justify-between items-center mb-3">
                <span class="text-sm font-medium text-text-dark">Service {{ index + 1 }}</span>
                <select v-model="service.icon" class="px-3 py-1 border border-sand rounded-lg text-sm">
                  <option value="home">Home Icon</option>
                  <option value="building">Building Icon</option>
                  <option value="landmark">Landmark Icon</option>
                </select>
              </div>
              <input v-model="service.title" class="w-full px-3 py-2 border border-sand rounded-lg mb-2" placeholder="Service Title">
              <textarea v-model="service.description" rows="2" class="w-full px-3 py-2 border border-sand rounded-lg text-sm" placeholder="Service description"></textarea>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button @click="saveContent" :disabled="saving" class="px-8 py-3 bg-earth text-white rounded-full font-medium hover:bg-clay transition-colors disabled:opacity-50">
            {{ saving ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </div>

      <!-- About Page Tab -->
      <div v-else-if="activeTab === 'about'" class="space-y-6">
        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <h2 class="font-display text-xl mb-6">Introduction</h2>
          <div>
            <label class="block text-sm font-medium text-text-dark mb-2">About Introduction Text</label>
            <textarea v-model="content.about_intro" rows="4" class="w-full px-4 py-3 border border-sand rounded-xl" placeholder="Company introduction"></textarea>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <h2 class="font-display text-xl mb-6">Our Vision</h2>
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-text-dark mb-2">Vision Title</label>
              <input v-model="content.about_vision_title" class="w-full px-4 py-3 border border-sand rounded-xl" placeholder="Our Vision">
            </div>
            <div v-for="(para, index) in content.about_vision_paragraphs" :key="index">
              <label class="block text-sm font-medium text-text-dark mb-2">Paragraph {{ index + 1 }}</label>
              <textarea v-model="content.about_vision_paragraphs[index]" rows="3" class="w-full px-4 py-3 border border-sand rounded-xl" placeholder="Vision paragraph"></textarea>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <h2 class="font-display text-xl mb-6">Core Values</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div v-for="(value, index) in content.values" :key="index" class="border border-sand rounded-xl p-4">
              <input v-model="value.title" class="w-full px-3 py-2 border border-sand rounded-lg mb-2 font-medium" placeholder="Value Title">
              <textarea v-model="value.description" rows="2" class="w-full px-3 py-2 border border-sand rounded-lg text-sm" placeholder="Value description"></textarea>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <h2 class="font-display text-xl mb-6">Our Expertise</h2>
          <div class="grid md:grid-cols-3 gap-4">
            <div v-for="(exp, index) in content.expertise" :key="index" class="border border-sand rounded-xl p-4">
              <input v-model="exp.title" class="w-full px-3 py-2 border border-sand rounded-lg mb-2 font-medium" placeholder="Expertise Title">
              <textarea v-model="exp.description" rows="2" class="w-full px-3 py-2 border border-sand rounded-lg text-sm" placeholder="Expertise description"></textarea>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <h2 class="font-display text-xl mb-6">Timeline Statistics</h2>
          <div class="grid md:grid-cols-4 gap-4">
            <div v-for="(item, index) in content.timeline" :key="index" class="border border-sand rounded-xl p-4">
              <label class="block text-xs font-medium text-text-light mb-1">Number</label>
              <input v-model="item.number" class="w-full px-3 py-2 border border-sand rounded-lg text-lg font-display mb-2" placeholder="1999">
              <label class="block text-xs font-medium text-text-light mb-1">Label</label>
              <input v-model="item.label" class="w-full px-3 py-2 border border-sand rounded-lg text-sm" placeholder="Founded">
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button @click="saveContent" :disabled="saving" class="px-8 py-3 bg-earth text-white rounded-full font-medium hover:bg-clay transition-colors disabled:opacity-50">
            {{ saving ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </div>

      <!-- Contact Tab -->
      <div v-else-if="activeTab === 'contact'" class="space-y-6">
        <div class="bg-white rounded-2xl p-6 shadow-sm">
          <h2 class="font-display text-xl mb-6">Contact Information</h2>
          <div class="grid md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-text-dark mb-2">Email Address</label>
              <input v-model="content.contact_email" class="w-full px-4 py-3 border border-sand rounded-xl" placeholder="info@example.com">
            </div>
            <div>
              <label class="block text-sm font-medium text-text-dark mb-2">Phone Number</label>
              <input v-model="content.contact_phone" class="w-full px-4 py-3 border border-sand rounded-xl" placeholder="+91 22 1234 5678">
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-text-dark mb-2">Address</label>
              <input v-model="content.contact_address" class="w-full px-4 py-3 border border-sand rounded-xl" placeholder="Mumbai, Maharashtra, India">
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
              <img v-if="project.images && project.images[0]" :src="project.images[0]" class="w-full h-full object-cover" :alt="project.name">
              <div v-else class="w-full h-full flex items-center justify-center text-text-light">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <path d="M21 15l-5-5L5 21"/>
                </svg>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2">
                <h3 class="font-medium text-text-dark truncate">{{ project.name }}</h3>
                <span v-if="project.featured" class="px-2 py-0.5 bg-clay text-white text-xs rounded-full">Featured</span>
              </div>
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
                <p class="text-sm text-text-medium">{{ submission.email }} | {{ submission.phone || 'No phone' }}</p>
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
            <div class="flex items-center gap-3">
              <input type="checkbox" id="featured" v-model="projectForm.featured" class="w-5 h-5 rounded border-sand text-clay focus:ring-clay">
              <label for="featured" class="text-sm font-medium text-text-dark">Featured Project (shows on home page)</label>
            </div>
            <div>
              <label class="block text-sm font-medium text-text-dark mb-2">Project Images</label>
              <div class="flex flex-wrap gap-3 mb-3">
                <div v-for="(img, index) in projectForm.images" :key="index" class="relative w-24 h-24 rounded-xl overflow-hidden group">
                  <img :src="img" class="w-full h-full object-cover">
                  <button type="button" @click="removeImage(index)" class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
                <label class="w-24 h-24 border-2 border-dashed border-sand rounded-xl flex items-center justify-center cursor-pointer hover:border-clay transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-text-light">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  <input type="file" accept="image/*" class="hidden" @change="handleImageUpload" multiple>
                </label>
              </div>
              <p class="text-xs text-text-light">First image will be used as the main project image</p>
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
  { id: 'hero', name: 'Home Page' },
  { id: 'about', name: 'About Page' },
  { id: 'contact', name: 'Contact Info' },
  { id: 'projects', name: 'Projects' },
  { id: 'messages', name: 'Messages' }
]

const activeTab = ref('hero')
const loading = ref(true)
const saving = ref(false)
const savingProject = ref(false)

const content = ref({
  hero_title: 'Where Nature Meets',
  hero_subtitle: 'Structure',
  hero_description: 'Creating harmonious spaces that flow with life. For 25 years, we\'ve designed architecture that breathes with its environment.',
  stats: [
    { number: '25+', label: 'Years of Excellence' },
    { number: '500+', label: 'Projects Completed' },
    { number: '50+', label: 'Awards Won' },
    { number: '100%', label: 'Client Satisfaction' }
  ],
  services: [
    { id: 1, icon: 'home', title: 'Residential Design', description: 'Crafting homes that embrace natural light and organic flow, creating spaces where families thrive.' },
    { id: 2, icon: 'building', title: 'Commercial Spaces', description: 'Designing workspaces that inspire productivity while maintaining harmony with the environment.' },
    { id: 3, icon: 'landmark', title: 'Government Projects', description: 'Creating public buildings that serve communities with dignity and architectural excellence.' }
  ],
  about_intro: 'M/s CHAMANKAR GROUP is a reputed & trusted name in the construction industry since more than 25 years.',
  about_vision_title: 'Our Vision',
  about_vision_paragraphs: [
    'Aspiring for world class living standards and contemporary work places come within reach of all.',
    'Our aim is setting up of comfortable and luxurious dwelling spheres.',
    'We create infrastructure which is a perfect blend of beauty and strength.'
  ],
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
  ],
  timeline: [
    { number: '1999', label: 'Founded' },
    { number: '150+', label: 'Projects' },
    { number: '40+', label: 'Awards' },
    { number: '200+', label: 'Team Members' }
  ],
  contact_email: 'info@chamankar.com',
  contact_phone: '+91 22 1234 5678',
  contact_address: 'Mumbai, Maharashtra, India'
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
  featured: false,
  images: []
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
    content.value = {
      ...content.value,
      ...siteContent.value,
      stats: siteContent.value.stats || content.value.stats,
      services: siteContent.value.services || content.value.services,
      about_vision_paragraphs: siteContent.value.about_vision_paragraphs || content.value.about_vision_paragraphs,
      values: siteContent.value.values || content.value.values,
      expertise: siteContent.value.expertise || content.value.expertise,
      timeline: siteContent.value.timeline || content.value.timeline
    }
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
    projectForm.value = {
      ...project,
      images: project.images || []
    }
  } else {
    projectForm.value = {
      name: '',
      location: '',
      type: 'Residential',
      description: '',
      status: '',
      completion_date: '',
      featured: false,
      images: []
    }
  }
  showProjectModal.value = true
}

const handleImageUpload = async (event) => {
  const files = event.target.files
  if (!files.length) return

  for (const file of files) {
    try {
      const url = await uploadImage(file)
      projectForm.value.images.push(url)
    } catch (error) {
      alert('Error uploading image: ' + error.message)
    }
  }
  event.target.value = ''
}

const removeImage = (index) => {
  projectForm.value.images.splice(index, 1)
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
