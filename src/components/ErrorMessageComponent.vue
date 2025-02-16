<script setup lang="ts">
defineProps<{
  message?: string
}>()

const DEFAULT_MESSAGE = 'Something went wrong'
</script>

<template>
  <div class="error">
    <img src="/error.png" />
    <p>{{ message ?? DEFAULT_MESSAGE }}</p>
  </div>
</template>

<style scoped>
.error {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
p {
  font-size: 10px;
}
</style>
