import { ref } from 'vue'
import { supabase } from '../lib/supabase'

// Sample projects - used as fallback when DB is empty
const sampleProjectsData = [
  {
    id: 'sample-1',
    name: 'Sunset Residences',
    location: 'Mumbai, Maharashtra',
    type: 'Residential',
    description: 'A luxury residential complex featuring modern architecture with sustainable design principles. The project spans 50,000 sq ft with premium amenities.',
    status: 'Completed',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'sample-2',
    name: 'Azure Business Park',
    location: 'Pune, Maharashtra',
    type: 'Commercial',
    description: 'State-of-the-art commercial complex designed to foster innovation and collaboration. Features green building certification.',
    status: 'Completed',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'sample-3',
    name: 'District Municipal Building',
    location: 'Thane, Maharashtra',
    type: 'Government',
    description: 'A landmark government building that combines functionality with architectural elegance. Designed to serve the community for generations.',
    status: 'Completed',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'sample-4',
    name: 'Horizon Heights',
    location: 'Navi Mumbai, Maharashtra',
    type: 'Residential',
    description: 'Premium high-rise apartments with panoramic city views. Each unit features modern interiors and smart home technology.',
    status: 'Ongoing',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'sample-5',
    name: 'Metro Corporate Tower',
    location: 'BKC, Mumbai',
    type: 'Commercial',
    description: 'A 30-story corporate tower with cutting-edge amenities and LEED Gold certification. Designed for the modern workforce.',
    status: 'Completed',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1478860409698-8707f313ee8b?w=800&h=600&fit=crop'
    ]
  },
  {
    id: 'sample-6',
    name: 'State Library Complex',
    location: 'Nagpur, Maharashtra',
    type: 'Government',
    description: 'A modern library and cultural center designed to inspire learning and community engagement.',
    status: 'Upcoming',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1568667256549-094345857637?w=800&h=600&fit=crop'
    ]
  }
]

// Shared state (singleton pattern) - initialized with sample projects
const projects = ref([...sampleProjectsData])
const loading = ref(false)
const error = ref(null)
const hasFetched = ref(false)

export function useProjects() {
  const fetchProjects = async (force = false) => {
    // Skip if already fetched and not forcing refresh
    if (hasFetched.value && !force) return

    loading.value = true
    error.value = null

    try {
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true })

      if (fetchError) throw fetchError

      // Only update if we got actual projects from DB with valid images
      if (data && data.length > 0) {
        // Normalize images field to always be an array
        const projectsWithImages = data.map(p => {
          let images = p.images
          if (!images || (Array.isArray(images) && images.length === 0)) {
            images = []
          } else if (typeof images === 'string') {
            try {
              images = JSON.parse(images)
            } catch {
              images = [images]
            }
          }
          return { ...p, images }
        })

        // Only use DB projects if at least some have images, otherwise keep samples
        const hasAnyImages = projectsWithImages.some(p => p.images && p.images.length > 0)

        if (hasAnyImages) {
          projects.value = projectsWithImages
        }
        // If no images, keep the sample projects
      }

      hasFetched.value = true
    } catch (e) {
      error.value = e.message
      console.error('Error fetching projects:', e)
    } finally {
      loading.value = false
    }
  }

  const getProject = async (id) => {
    const { data, error: fetchError } = await supabase
      .from('projects')
      .select('*')
      .eq('id', id)
      .single()

    if (fetchError) throw fetchError
    return data
  }

  const createProject = async (project) => {
    const { data, error: insertError } = await supabase
      .from('projects')
      .insert([project])
      .select()
      .single()

    if (insertError) throw insertError
    await fetchProjects(true) // Force refresh
    return data
  }

  const updateProject = async (id, updates) => {
    const { data, error: updateError } = await supabase
      .from('projects')
      .update(updates)
      .eq('id', id)
      .select()
      .single()

    if (updateError) throw updateError
    await fetchProjects(true) // Force refresh
    return data
  }

  const deleteProject = async (id) => {
    const { error: deleteError } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (deleteError) throw deleteError
    await fetchProjects(true) // Force refresh
  }

  const uploadImage = async (file, folder = 'projects') => {
    const fileExt = file.name.split('.').pop()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`
    const filePath = `${folder}/${fileName}`

    const { error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, file)

    if (uploadError) throw uploadError

    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath)

    return publicUrl
  }

  const deleteImage = async (url) => {
    const path = url.split('/images/')[1]
    if (path) {
      await supabase.storage.from('images').remove([path])
    }
  }

  return {
    projects,
    loading,
    error,
    fetchProjects,
    getProject,
    createProject,
    updateProject,
    deleteProject,
    uploadImage,
    deleteImage
  }
}
