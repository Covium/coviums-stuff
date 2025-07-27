<script setup lang="ts">
defineProps({
  color: { type: String, default: 'currentColor' },
  size: { type: Number, default: 10 },
});
</script>

<template>
  <svg
    :width="size"
    :height="size"
    viewBox="0 0 10 10"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M4.4 8L5 9L5.6 8H4.4Z" :fill="color" />
    <path
      d="M8 4V1L6 4M8 4H6M8 4V6.5L6.2 7M8 4L6.2 7M2 4V1L4 4M2 4H4M2 4V6.5L3.8 7M2 4L3.8 7M4 4H6M3.8 7L4.4 8M6.2 7L5.6 8M4.4 8L5 9L5.6 8M4.4 8H5.6"
      :stroke="color"
      stroke-width="0.5"
      stroke-linejoin="round"
    />
  </svg>
</template>
