<template>
    <div class="about-admin">
        <h1>About Admin</h1>
        <p>{{ message }}</p>
        <button @click="handleClick">Click me</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    name: 'AboutAdmin',
    data() {
        return {
            message: 'Welcome to the admin panel',
        };
    },
    methods: {
        handleClick(): void {
            console.log('Button clicked');
        },
    },
});
</script>

<style scoped>
.about-admin {
    padding: 20px;
}

h1 {
    color: #333;
}
</style>