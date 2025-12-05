<template>
    <div class="contacts-admin">
        <h1>Manage Contacts</h1>
        
        <div class="controls">
            <button @click="addContact" class="btn-primary">Add Contact</button>
            <input 
                v-model="searchQuery" 
                type="text" 
                placeholder="Search contacts..."
                class="search-input"
            />
        </div>

        <table class="contacts-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="contact in filteredContacts" :key="contact.id">
                    <td>{{ contact.name }}</td>
                    <td>{{ contact.email }}</td>
                    <td>{{ contact.phone }}</td>
                    <td>
                        <button @click="editContact(contact)" class="btn-small">Edit</button>
                        <button @click="deleteContact(contact.id)" class="btn-small btn-danger">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Contact {
    id: number
    name: string
    email: string
    phone: string
}

const contacts = ref<Contact[]>([])
const searchQuery = ref('')

const filteredContacts = computed(() => {
    return contacts.value.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

const addContact = () => {
    // Implementation for adding a contact
}

const editContact = (contact: Contact) => {
    // Implementation for editing a contact
}

const deleteContact = (id: number) => {
    contacts.value = contacts.value.filter(c => c.id !== id)
}
</script>

<style scoped>
.contacts-admin {
    padding: 20px;
}

.controls {
    margin-bottom: 20px;
    display: flex;
    gap: 10px;
}

.search-input {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.contacts-table {
    width: 100%;
    border-collapse: collapse;
}

.contacts-table th,
.contacts-table td {
    padding: 10px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.btn-primary,
.btn-small {
    padding: 8px 12px;
    margin-right: 5px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007bff;
    color: white;
}

.btn-danger {
    background-color: #dc3545;
}
</style>