import { ref } from 'vue'
import { supabase } from '../lib/supabase'

export function useProjects() {
  const projects = ref([])
  const loading = ref(false)
  const error = ref(null)

  const fetchProjects = async () => {
    loading.value = true
    error.value = null
    try {
      const { data, error: fetchError } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true })

      if (fetchError) throw fetchError
      projects.value = data || []
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
    await fetchProjects()
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
    await fetchProjects()
    return data
  }

  const deleteProject = async (id) => {
    const { error: deleteError } = await supabase
      .from('projects')
      .delete()
      .eq('id', id)

    if (deleteError) throw deleteError
    await fetchProjects()
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
