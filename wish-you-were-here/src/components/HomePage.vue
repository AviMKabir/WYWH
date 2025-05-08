<template>
  <div class="homepage-container">
    <h1>Welcome to the Homepage</h1>
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
      <div>Redirecting to data page...</div>
    </div>
    <form v-else class="homepage-form" @submit.prevent="onSubmit">
      <div v-if="errorMessage" class="error-message">
        {{ errorMessage }}
      </div>
      <div class="form-group">
        <label for="instagram">Instagram</label>
        <input
          id="instagram"
          v-model="instagram"
          type="text"
          placeholder="Enter your Instagram handle"
          autocomplete="username"
          :disabled="loading"
        />
      </div>
      <div class="form-group">
        <label for="phone">Phone Number</label>
        <input
          id="phone"
          v-model="phone"
          type="tel"
          placeholder="Enter your phone number"
          autocomplete="tel"
          pattern="[0-9]{10,15}"
          :disabled="loading"
        />
      </div>
      <button type="submit" class="submit-btn" :disabled="loading">
        <span v-if="loading">Submitting...</span>
        <span v-else>Submit</span>
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'vue-router'

const instagram = ref('')
const phone = ref('')
const loading = ref(false)
const errorMessage = ref('')
const successMessage = ref('')
const router = useRouter()

async function onSubmit() {
  // Reset messages
  errorMessage.value = ''
  successMessage.value = ''
  
  // Validate input
  if (!instagram.value || !phone.value) {
    errorMessage.value = 'Please fill in both fields'
    return
  }
  
  // Set loading state
  loading.value = true
  
  try {
    // Insert data into the contacts table
    const { data, error } = await supabase
      .from('contacts')
      .insert([
        { 
          instagram: instagram.value, 
          phone_number: phone.value 
        }
      ])
      .select()
    
    if (error) throw error
    
    // Success!
    successMessage.value = 'Contact information saved successfully!'
    instagram.value = ''
    phone.value = ''
    
    // Navigate to data page after a short delay
    setTimeout(() => {
      router.push('/data')
    }, 2000)
  } catch (error) {
    console.error('Error inserting contact:', error)
    errorMessage.value = error.message || 'Failed to save contact information'
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.homepage-container {
  max-width: 400px;
  margin: 40px auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}

.homepage-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.submit-btn {
  padding: 0.7rem;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s;
}

.submit-btn:disabled {
  background-color: #9be0c3;
  cursor: not-allowed;
}

.submit-btn:hover:not(:disabled) {
  background: #3aa876;
}

.error-message {
  background-color: #ffebee;
  color: #d32f2f;
  padding: 0.8rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  border-left: 4px solid #d32f2f;
}

.success-message {
  background-color: #e8f5e9;
  color: #2e7d32;
  padding: 1.5rem;
  border-radius: 4px;
  text-align: center;
  border-left: 4px solid #2e7d32;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group label {
  font-weight: 600;
  color: #333;
}

.form-group input {
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  font-size: 1rem;
}

.form-group input:focus {
  outline: none;
  border-color: #42b983;
  box-shadow: 0 0 0 2px rgba(66, 185, 131, 0.1);
}
</style>
