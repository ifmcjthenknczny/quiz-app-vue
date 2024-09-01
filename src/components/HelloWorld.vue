<script setup lang="ts">
import Button from './Button.vue'

const handleClick = () => console.log('It works!')
</script>

<template>
  <Button @click="handleClick" content="Click me" />
</template>

<style scoped>

</style>
