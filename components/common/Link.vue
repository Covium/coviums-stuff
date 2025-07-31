<script setup lang="ts">
import type { NuxtLinkProps } from '#app';

const props = defineProps<NuxtLinkProps>();
</script>

<template>
  <NuxtLink v-bind="props" class="inline">
    <span>
      <slot />
      <Icon
        v-if="props.target === '_blank'"
        name="ic:round-arrow-outward"
        size="0.75rem"
        class="ml-1 inline align-super"
      />
    </span>
  </NuxtLink>
</template>
