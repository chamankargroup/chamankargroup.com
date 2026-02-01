<template>
  <div class="admin min-h-screen bg-sand-light">
    <!-- Header -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center">
        <h1 class="font-display text-xl sm:text-2xl text-text-dark">Admin Panel</h1>
        <div class="flex items-center gap-2 sm:gap-4">
          <span class="text-xs sm:text-sm text-text-medium hidden sm:inline">{{ user?.email }}</span>
          <button @click="handleLogout" class="px-3 sm:px-4 py-2 bg-earth text-white rounded-full text-xs sm:text-sm hover:bg-clay transition-colors min-h-[40px]">
            Logout
          </button>
        </div>
      </div>
    </header>

    <!-- Tabs -->
    <div class="bg-white border-b">
      <div class="max-w-7xl mx-auto px-4 sm:px-6">
        <nav class="flex gap-4 sm:gap-8 overflow-x-auto scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            @click="activeTab = tab.id"
            class="py-3 sm:py-4 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap min-h-[44px]"
            :class="activeTab === tab.id ? 'border-clay text-clay' : 'border-transparent text-text-medium hover:text-text-dark'"
          >
            {{ tab.name }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Content -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      <!-- Loading State -->
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block w-8 h-8 border-4 border-clay border-t-transparent rounded-full animate-spin"></div>
        <p class="mt-4 text-text-medium">Loading...</p>
      </div>

      <!-- Hero Section Tab -->
      <div v-else-if="activeTab === 'hero'" class="space-y-4 sm:space-y-6">
        <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
          <h2 class="font-display text-lg sm:text-xl mb-4 sm:mb-6">Hero Section</h2>
          <div class="grid gap-3 sm:gap-4">
            <div>
              <label class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">Title (First Line)</label>
              <input v-model="content.hero_title" class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-sand rounded-lg sm:rounded-xl text-sm sm:text-base" placeholder="Where Nature Meets">
            </div>
            <div>
              <label class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">Title (Highlighted)</label>
              <input v-model="content.hero_subtitle" class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-sand rounded-lg sm:rounded-xl text-sm sm:text-base" placeholder="Structure">
            </div>
            <div>
              <label class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">Description</label>
              <textarea v-model="content.hero_description" rows="3" class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-sand rounded-lg sm:rounded-xl text-sm sm:text-base" placeholder="Hero description"></textarea>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
          <h2 class="font-display text-lg sm:text-xl mb-4 sm:mb-6">Statistics</h2>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div v-for="(stat, index) in content.stats" :key="index" class="border border-sand rounded-lg sm:rounded-xl p-3 sm:p-4">
              <label class="block text-[10px] sm:text-xs font-medium text-text-light mb-1">Number</label>
              <input v-model="stat.number" class="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-sand rounded-lg text-base sm:text-lg font-display mb-2" placeholder="25+">
              <label class="block text-[10px] sm:text-xs font-medium text-text-light mb-1">Label</label>
              <input v-model="stat.label" class="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-sand rounded-lg text-xs sm:text-sm" placeholder="Years of Excellence">
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
          <h2 class="font-display text-lg sm:text-xl mb-4 sm:mb-6">Services / Expertise (Home Page)</h2>
          <div class="space-y-3 sm:space-y-4">
            <div v-for="(service, index) in content.services" :key="index" class="border border-sand rounded-lg sm:rounded-xl p-3 sm:p-4">
              <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                <span class="text-xs sm:text-sm font-medium text-text-dark">Service {{ index + 1 }}</span>
                <select v-model="service.icon" class="px-2 sm:px-3 py-1.5 sm:py-1 border border-sand rounded-lg text-xs sm:text-sm min-h-[36px]">
                  <option value="home">Home Icon</option>
                  <option value="building">Building Icon</option>
                  <option value="landmark">Landmark Icon</option>
                </select>
              </div>
              <input v-model="service.title" class="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-sand rounded-lg mb-2 text-sm sm:text-base" placeholder="Service Title">
              <textarea v-model="service.description" rows="2" class="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-sand rounded-lg text-xs sm:text-sm" placeholder="Service description"></textarea>
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button @click="saveContent" :disabled="saving" class="w-full sm:w-auto px-6 sm:px-8 py-3 bg-earth text-white rounded-full text-sm sm:text-base font-medium hover:bg-clay transition-colors disabled:opacity-50 min-h-[48px]">
            {{ saving ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </div>

      <!-- About Page Tab -->
      <div v-else-if="activeTab === 'about'" class="space-y-4 sm:space-y-6">
        <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
          <h2 class="font-display text-lg sm:text-xl mb-4 sm:mb-6">Introduction</h2>
          <div>
            <label class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">About Introduction Text</label>
            <textarea v-model="content.about_intro" rows="4" class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-sand rounded-lg sm:rounded-xl text-sm sm:text-base" placeholder="Company introduction"></textarea>
          </div>
        </div>

        <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
          <h2 class="font-display text-lg sm:text-xl mb-4 sm:mb-6">Our Vision</h2>
          <div class="space-y-3 sm:space-y-4">
            <div>
              <label class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">Vision Title</label>
              <input v-model="content.about_vision_title" class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-sand rounded-lg sm:rounded-xl text-sm sm:text-base" placeholder="Our Vision">
            </div>
            <div v-for="(para, index) in content.about_vision_paragraphs" :key="index">
              <label class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">Paragraph {{ index + 1 }}</label>
              <textarea v-model="content.about_vision_paragraphs[index]" rows="3" class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-sand rounded-lg sm:rounded-xl text-sm sm:text-base" placeholder="Vision paragraph"></textarea>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
          <h2 class="font-display text-lg sm:text-xl mb-4 sm:mb-6">Core Values</h2>
          <div class="grid sm:grid-cols-2 gap-3 sm:gap-4">
            <div v-for="(value, index) in content.values" :key="index" class="border border-sand rounded-lg sm:rounded-xl p-3 sm:p-4">
              <input v-model="value.title" class="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-sand rounded-lg mb-2 font-medium text-sm sm:text-base" placeholder="Value Title">
              <textarea v-model="value.description" rows="2" class="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-sand rounded-lg text-xs sm:text-sm" placeholder="Value description"></textarea>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
          <h2 class="font-display text-lg sm:text-xl mb-4 sm:mb-6">Our Expertise</h2>
          <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div v-for="(exp, index) in content.expertise" :key="index" class="border border-sand rounded-lg sm:rounded-xl p-3 sm:p-4">
              <input v-model="exp.title" class="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-sand rounded-lg mb-2 font-medium text-sm sm:text-base" placeholder="Expertise Title">
              <textarea v-model="exp.description" rows="2" class="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-sand rounded-lg text-xs sm:text-sm" placeholder="Expertise description"></textarea>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
          <h2 class="font-display text-lg sm:text-xl mb-4 sm:mb-6">Timeline Statistics</h2>
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <div v-for="(item, index) in content.timeline" :key="index" class="border border-sand rounded-lg sm:rounded-xl p-3 sm:p-4">
              <label class="block text-[10px] sm:text-xs font-medium text-text-light mb-1">Number</label>
              <input v-model="item.number" class="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-sand rounded-lg text-base sm:text-lg font-display mb-2" placeholder="1999">
              <label class="block text-[10px] sm:text-xs font-medium text-text-light mb-1">Label</label>
              <input v-model="item.label" class="w-full px-2 sm:px-3 py-1.5 sm:py-2 border border-sand rounded-lg text-xs sm:text-sm" placeholder="Founded">
            </div>
          </div>
        </div>

        <div class="flex justify-end">
          <button @click="saveContent" :disabled="saving" class="w-full sm:w-auto px-6 sm:px-8 py-3 bg-earth text-white rounded-full text-sm sm:text-base font-medium hover:bg-clay transition-colors disabled:opacity-50 min-h-[48px]">
            {{ saving ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </div>

      <!-- Contact Tab -->
      <div v-else-if="activeTab === 'contact'" class="space-y-4 sm:space-y-6">
        <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
          <h2 class="font-display text-lg sm:text-xl mb-4 sm:mb-6">Contact Information</h2>
          <div class="grid sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">Email Address</label>
              <input v-model="content.contact_email" class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-sand rounded-lg sm:rounded-xl text-sm sm:text-base" placeholder="info@example.com">
            </div>
            <div>
              <label class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">Phone Number</label>
              <input v-model="content.contact_phone" class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-sand rounded-lg sm:rounded-xl text-sm sm:text-base" placeholder="+91 22 1234 5678">
            </div>
            <div class="sm:col-span-2">
              <label class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">Address</label>
              <input v-model="content.contact_address" class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-sand rounded-lg sm:rounded-xl text-sm sm:text-base" placeholder="Mumbai, Maharashtra, India">
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm">
          <h2 class="font-display text-lg sm:text-xl mb-4 sm:mb-6">Map Location</h2>
          <p class="text-xs sm:text-sm text-text-medium mb-4">Enter the coordinates for your office location. You can find coordinates by right-clicking on Google Maps and selecting the coordinates.</p>
          <div class="grid sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <label class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">Latitude</label>
              <input v-model="content.map_lat" type="number" step="any" class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-sand rounded-lg sm:rounded-xl text-sm sm:text-base" placeholder="19.0596">
            </div>
            <div>
              <label class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">Longitude</label>
              <input v-model="content.map_lng" type="number" step="any" class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-sand rounded-lg sm:rounded-xl text-sm sm:text-base" placeholder="72.8656">
            </div>
          </div>
          <p class="text-[10px] sm:text-xs text-text-light mt-3">Default location: BKC, Mumbai (19.0596, 72.8656)</p>
        </div>

        <div class="flex justify-end">
          <button @click="saveContent" :disabled="saving" class="w-full sm:w-auto px-6 sm:px-8 py-3 bg-earth text-white rounded-full text-sm sm:text-base font-medium hover:bg-clay transition-colors disabled:opacity-50 min-h-[48px]">
            {{ saving ? 'Saving...' : 'Save Changes' }}
          </button>
        </div>
      </div>

      <!-- Projects Tab -->
      <div v-else-if="activeTab === 'projects'" class="space-y-4 sm:space-y-6">
        <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
          <h2 class="font-display text-lg sm:text-xl">Manage Projects</h2>
          <button @click="openProjectModal()" class="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-2 bg-earth text-white rounded-full text-sm font-medium hover:bg-clay transition-colors min-h-[44px]">
            + Add Project
          </button>
        </div>

        <div class="grid gap-3 sm:gap-4">
          <div v-for="project in projects" :key="project.id" class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-6">
            <div class="w-full sm:w-24 h-40 sm:h-24 bg-sand rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0">
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
              <div class="flex flex-wrap items-center gap-2">
                <h3 class="font-medium text-text-dark text-sm sm:text-base">{{ project.name }}</h3>
                <span v-if="project.featured" class="px-2 py-0.5 bg-clay text-white text-[10px] sm:text-xs rounded-full">Featured</span>
              </div>
              <p class="text-xs sm:text-sm text-text-medium mt-1">{{ project.location }}</p>
              <span class="inline-block mt-2 px-2.5 sm:px-3 py-1 bg-clay/10 text-clay text-[10px] sm:text-xs rounded-full">{{ project.type }}</span>
            </div>
            <div class="flex gap-2 self-end sm:self-center">
              <button @click="openProjectModal(project)" class="p-2.5 sm:p-2 text-text-medium hover:text-clay transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                </svg>
              </button>
              <button @click="confirmDelete(project)" class="p-2.5 sm:p-2 text-text-medium hover:text-red-500 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
              </button>
            </div>
          </div>

          <div v-if="projects.length === 0" class="text-center py-8 sm:py-12 bg-white rounded-xl sm:rounded-2xl">
            <p class="text-text-medium text-sm sm:text-base">No projects yet. Add your first project!</p>
          </div>
        </div>
      </div>

      <!-- Contact Submissions Tab -->
      <div v-else-if="activeTab === 'messages'" class="space-y-4 sm:space-y-6">
        <h2 class="font-display text-lg sm:text-xl">Contact Messages</h2>

        <div class="space-y-3 sm:space-y-4">
          <div v-for="submission in submissions" :key="submission.id" class="bg-white rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-sm" :class="{ 'opacity-60': submission.read }">
            <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-4 mb-3 sm:mb-4">
              <div class="min-w-0">
                <h3 class="font-medium text-text-dark text-sm sm:text-base truncate">{{ submission.name }}</h3>
                <p class="text-xs sm:text-sm text-text-medium truncate">{{ submission.email }}</p>
                <p class="text-xs text-text-light">{{ submission.phone || 'No phone' }}</p>
              </div>
              <div class="flex items-center gap-2 flex-shrink-0">
                <span class="text-[10px] sm:text-xs text-text-light">{{ formatDate(submission.created_at) }}</span>
                <span v-if="!submission.read" class="w-2 h-2 bg-clay rounded-full"></span>
              </div>
            </div>
            <p class="text-xs sm:text-sm font-medium text-text-dark mb-2">{{ submission.subject }}</p>
            <p class="text-xs sm:text-sm text-text-medium whitespace-pre-line">{{ submission.message }}</p>
            <div class="mt-3 sm:mt-4 flex gap-3 sm:gap-2">
              <button v-if="!submission.read" @click="markMessageRead(submission.id)" class="text-xs sm:text-sm text-clay hover:underline min-h-[36px] sm:min-h-0">
                Mark as read
              </button>
              <button @click="deleteMessage(submission.id)" class="text-xs sm:text-sm text-red-500 hover:underline min-h-[36px] sm:min-h-0">
                Delete
              </button>
            </div>
          </div>

          <div v-if="submissions.length === 0" class="text-center py-8 sm:py-12 bg-white rounded-xl sm:rounded-2xl">
            <p class="text-text-medium text-sm sm:text-base">No messages yet.</p>
          </div>
        </div>
      </div>
    </main>

    <!-- Project Modal -->
    <Teleport to="body">
      <div v-if="showProjectModal" class="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-3 sm:p-4" @click.self="showProjectModal = false">
        <div class="bg-white rounded-xl sm:rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div class="p-4 sm:p-6 border-b border-sand sticky top-0 bg-white z-10 flex justify-between items-center">
            <h3 class="font-display text-lg sm:text-xl">{{ editingProject ? 'Edit Project' : 'Add Project' }}</h3>
            <button type="button" @click="showProjectModal = false" class="sm:hidden p-2 text-text-medium min-h-[44px] min-w-[44px] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
          </div>
          <form @submit.prevent="saveProject" class="p-4 sm:p-6 space-y-3 sm:space-y-4">
            <div>
              <label class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">Project Name *</label>
              <input v-model="projectForm.name" required class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-sand rounded-lg sm:rounded-xl text-sm sm:text-base">
            </div>
            <div class="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">Location *</label>
                <input v-model="projectForm.location" required class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-sand rounded-lg sm:rounded-xl text-sm sm:text-base">
              </div>
              <div>
                <label class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">Type *</label>
                <select v-model="projectForm.type" required class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-sand rounded-lg sm:rounded-xl text-sm sm:text-base">
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Government">Government</option>
                </select>
              </div>
            </div>
            <div>
              <label class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">Description</label>
              <textarea v-model="projectForm.description" rows="4" class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-sand rounded-lg sm:rounded-xl text-sm sm:text-base"></textarea>
            </div>
            <div class="grid sm:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">Status</label>
                <select v-model="projectForm.status" class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-sand rounded-lg sm:rounded-xl text-sm sm:text-base">
                  <option value="">Select status</option>
                  <option value="Completed">Completed</option>
                  <option value="Ongoing">Ongoing</option>
                  <option value="Upcoming">Upcoming</option>
                </select>
              </div>
              <div>
                <label class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">Completion Date</label>
                <input v-model="projectForm.completion_date" class="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-sand rounded-lg sm:rounded-xl text-sm sm:text-base" placeholder="e.g., December 2024">
              </div>
            </div>
            <div class="flex items-center gap-3 py-1">
              <input type="checkbox" id="featured" v-model="projectForm.featured" class="w-5 h-5 rounded border-sand text-clay focus:ring-clay">
              <label for="featured" class="text-xs sm:text-sm font-medium text-text-dark">Featured Project (shows on home page)</label>
            </div>
            <div>
              <label class="block text-xs sm:text-sm font-medium text-text-dark mb-1.5 sm:mb-2">Project Images</label>
              <div class="flex flex-wrap gap-2 sm:gap-3 mb-2 sm:mb-3">
                <div v-for="(img, index) in projectForm.images" :key="index" class="relative w-20 h-20 sm:w-24 sm:h-24 rounded-lg sm:rounded-xl overflow-hidden group">
                  <img :src="img" class="w-full h-full object-cover">
                  <button type="button" @click="removeImage(index)" class="absolute inset-0 bg-black/50 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                  </button>
                </div>
                <label class="w-20 h-20 sm:w-24 sm:h-24 border-2 border-dashed border-sand rounded-lg sm:rounded-xl flex items-center justify-center cursor-pointer hover:border-clay transition-colors">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-text-light">
                    <line x1="12" y1="5" x2="12" y2="19"/>
                    <line x1="5" y1="12" x2="19" y2="12"/>
                  </svg>
                  <input type="file" accept="image/*" class="hidden" @change="handleImageUpload" multiple>
                </label>
              </div>
              <p class="text-[10px] sm:text-xs text-text-light">First image will be used as the main project image</p>
            </div>
            <div class="flex flex-col-reverse sm:flex-row sm:justify-end gap-2 sm:gap-4 pt-4">
              <button type="button" @click="showProjectModal = false" class="w-full sm:w-auto px-6 py-2.5 sm:py-2 border border-sand rounded-full text-text-medium hover:bg-sand transition-colors text-sm sm:text-base min-h-[44px]">
                Cancel
              </button>
              <button type="submit" :disabled="savingProject" class="w-full sm:w-auto px-6 py-2.5 sm:py-2 bg-earth text-white rounded-full hover:bg-clay transition-colors disabled:opacity-50 text-sm sm:text-base min-h-[44px]">
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
  contact_address: 'Mumbai, Maharashtra, India',
  map_lat: 19.0596,
  map_lng: 72.8656
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
    fetchProjects(true), // Force refresh in admin
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
    // Check if editing a real DB project (has valid UUID) or a sample project
    const isSampleProject = editingProject.value?.id?.toString().startsWith('sample-')

    if (editingProject.value && !isSampleProject) {
      // Update existing DB project
      await updateProject(editingProject.value.id, projectForm.value)
    } else {
      // Create new project (either new or from sample)
      // Remove the sample ID if present
      const projectData = { ...projectForm.value }
      delete projectData.id
      await createProject(projectData)
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
