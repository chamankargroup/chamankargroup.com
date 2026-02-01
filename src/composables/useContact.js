import { ref } from 'vue'
import { supabase } from '../lib/supabase'

export function useContact() {
  const submissions = ref([])
  const loading = ref(false)

  const submitContact = async (formData) => {
    const { data, error } = await supabase
      .from('contact_submissions')
      .insert([{
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        subject: formData.subject,
        message: formData.message
      }])
      .select()
      .single()

    if (error) throw error
    return data
  }

  const fetchSubmissions = async () => {
    loading.value = true
    try {
      const { data, error } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      submissions.value = data || []
    } catch (e) {
      console.error('Error fetching submissions:', e)
    } finally {
      loading.value = false
    }
  }

  const markAsRead = async (id) => {
    const { error } = await supabase
      .from('contact_submissions')
      .update({ read: true })
      .eq('id', id)

    if (error) throw error
    await fetchSubmissions()
  }

  const deleteSubmission = async (id) => {
    const { error } = await supabase
      .from('contact_submissions')
      .delete()
      .eq('id', id)

    if (error) throw error
    await fetchSubmissions()
  }

  return {
    submissions,
    loading,
    submitContact,
    fetchSubmissions,
    markAsRead,
    deleteSubmission
  }
}
