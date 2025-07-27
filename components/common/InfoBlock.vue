<script setup lang="ts">
defineProps({
  title: { type: String, default: '' },
  iconName: { type: String, default: '' },
  description: { type: String, default: '' },
});
</script>

<template>
  <div
    class="bg-obsidian-950 flex h-fit w-full flex-col overflow-clip rounded-3xl border-4 border-fuchsia-700"
  >
    <div class="bg-obsidian-800 relative flex items-center justify-center p-2">
      <Icon
        v-if="iconName"
        class="absolute top-1/2 left-2 -translate-y-1/2"
        :name="iconName"
        size="1.75rem"
      />
      <h3 v-if="title" class="font-display text-center text-xl">{{ title }}</h3>
    </div>
    <div
      v-if="description"
      class="bg-obsidian-700 flex items-center justify-center px-2 py-1 text-center"
    >
      <h3 class="text-xs italic">{{ description }}</h3>
    </div>
    <div class="flex items-center justify-center-safe">
      <slot />
    </div>
  </div>
</template>
