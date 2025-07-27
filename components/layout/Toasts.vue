<script setup lang="ts">
import { isVNode } from 'vue';

const { toasts } = useToast();

function toastClass(type: string) {
  return {
    'bg-green-600': type === 'success',
    'bg-red-600': type === 'error',
    'bg-yellow-600': type === 'warning',
    'bg-blue-600': type === 'info',
  };
}
</script>

<template>
  <div class="fixed bottom-2 left-2 z-50 flex flex-col gap-y-2">
    <div
      v-for="toast in toasts"
      :key="toast.id"
      :class="toastClass(toast.type)"
      class="relative flex items-center justify-center gap-x-2 overflow-clip rounded-full border-2 border-fuchsia-700 bg-transparent px-4 py-2"
    >
      <progress
        class="bg-obsidian-950 [&::-moz-progress-bar]:bg-obsidian-800 absolute -z-1 h-full w-full appearance-none"
        :max="toast.duration"
        :value="toast.duration - toast.elapsed"
      />

      <Icon name="ic:outline-info" width="1rem" />
      <component :is="toast.message" v-if="isVNode(toast.message)" />
      <span v-else>{{ toast.message }}</span>
    </div>
  </div>
</template>
