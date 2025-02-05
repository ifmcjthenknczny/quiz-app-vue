<script setup lang="ts">
defineProps<{
    content: string
    onClick: () => void
}>()
</script>

<template>
    <button @click="onClick">
        {{content}}
    </button>
</template>

<style scoped>

</style>