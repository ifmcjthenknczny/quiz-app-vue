<script setup lang="ts">
defineProps<{
    onClick: () => void
}>()
</script>

<template>
    <button @click="onClick" class="link-button">
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
  font-size: 12px;
  border: none;
  cursor: pointer;
  height: 48px;
  width: 128px;
}
</style>