<script setup lang="ts">
import type { NuxtLinkProps } from '#app';

const props = defineProps<NuxtLinkProps & { containerClass?: string }>();
</script>

<template>
  <NuxtLink v-bind="props" class="inline">
    <span class="inline-block min-w-0" :class="props.containerClass">
      <slot />
      <Icon
        v-if="props.target === '_blank'"
        name="ic:round-arrow-outward"
        size="0.75rem"
        class="ml-0.5 inline align-super"
      />
    </span>
  </NuxtLink>
</template>
