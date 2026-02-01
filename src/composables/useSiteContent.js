import { ref } from 'vue'
import { supabase } from '../lib/supabase'

const siteContent = ref(null)
const loading = ref(false)

export function useSiteContent() {
  const fetchContent = async () => {
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('site_content')
        .select('*')
        .single()

      if (error && error.code !== 'PGRST116') throw error
      siteContent.value = data
    } catch (e) {
      console.error('Error fetching content:', e)
    } finally {
      loading.value = false
    }
    return siteContent.value
  }

  const updateContent = async (updates) => {
    const { data: existing } = await supabase
      .from('site_content')
      .select('id')
      .single()

    let result
    if (existing) {
      const { data, error } = await supabase
        .from('site_content')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', existing.id)
        .select()
        .single()
      if (error) throw error
      result = data
    } else {
      const { data, error } = await supabase
        .from('site_content')
        .insert([updates])
        .select()
        .single()
      if (error) throw error
      result = data
    }

    siteContent.value = result
    return result
  }

  return {
    siteContent,
    loading,
    fetchContent,
    updateContent
  }
}
