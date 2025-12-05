<template>
    <div class="projects-admin">
        <h1>Projects Administration</h1>
        
        <div class="actions">
            <button @click="addProject" class="btn-primary">Add Project</button>
        </div>

        <table v-if="projects.length" class="projects-table">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="project in projects" :key="project.id">
                    <td>{{ project.name }}</td>
                    <td>{{ project.description }}</td>
                    <td>{{ project.status }}</td>
                    <td>
                        <button @click="editProject(project.id)" class="btn-edit">Edit</button>
                        <button @click="deleteProject(project.id)" class="btn-delete">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <p v-else>No projects found.</p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Project {
    id: number;
    name: string;
    description: string;
    status: string;
}

export default defineComponent({
    name: 'ProjectsAdmin',
    data() {
        return {
            projects: [] as Project[],
        };
    },
    methods: {
        addProject() {
            // Add project logic
        },
        editProject(id: number) {
            // Edit project logic
        },
        deleteProject(id: number) {
            // Delete project logic
        },
    },
    mounted() {
        // Fetch projects on mount
    },
});
</script>

<style scoped>
.projects-admin {
    padding: 20px;
}

.actions {
    margin-bottom: 20px;
}

.btn-primary,
.btn-edit,
.btn-delete {
    padding: 8px 16px;
    margin-right: 8px;
    cursor: pointer;
    border: none;
    border-radius: 4px;
}

.btn-primary {
    background-color: #007bff;
    color: white;
}

.btn-edit {
    background-color: #28a745;
    color: white;
}

.btn-delete {
    background-color: #dc3545;
    color: white;
}

.projects-table {
    width: 100%;
    border-collapse: collapse;
}

.projects-table th,
.projects-table td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.projects-table th {
    background-color: #f8f9fa;
    font-weight: bold;
}
</style>