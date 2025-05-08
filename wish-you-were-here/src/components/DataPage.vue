<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../lib/supabaseClient'

const contacts = ref([])
const loading = ref(true)
const errorMsg = ref('')

async function getContacts() {
  const { data, error } = await supabase
    .from('contacts')
    .select('*')

  if (error) {
    errorMsg.value = 'Error fetching contacts: ' + error.message
    console.error('Error fetching contacts:', error)
  } else {
    contacts.value = data || []
  }
  loading.value = false
}

onMounted(() => {
  getContacts()
})
</script>

<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-if="errorMsg" style="color: red;">{{ errorMsg }}</div>
      <div v-else-if="contacts.length === 0">No contacts found.</div>
      <table v-else class="contacts-table">
        <thead>
          <tr>
            <th v-for="header in Object.keys(contacts[0])" :key="header">{{ header }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="contact in contacts" :key="contact.id">
            <td v-for="header in Object.keys(contacts[0])" :key="header">{{ contact[header] }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.contacts-table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 1rem;
}
.contacts-table th, .contacts-table td {
  border: 1px solid #ddd;
  padding: 8px;
}
.contacts-table th {
  background-color: #f2f2f2;
  text-align: left;
}
</style>
