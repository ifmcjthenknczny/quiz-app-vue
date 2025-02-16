<script setup lang="ts">
defineProps<{
  onClick: () => void
}>()
</script>

<template>
  <button class="link-button" @click="onClick">
    <slot />
  </button>
</template>

<style scoped>
.link-button {
  margin-top: 16px;
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #007bff;
  color: white;
  font-size: 1.2rem;
  border: none;
  cursor: pointer;
  height: 48px;
  width: 160px;
}
</style>
