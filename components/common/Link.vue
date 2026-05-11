<script setup lang="ts">
import type { NuxtLinkProps } from '#app';
import { computed } from 'vue';

const props = defineProps<NuxtLinkProps & { containerClass?: string }>();

const nuxtLinkProps = computed(() => {
  const {
    containerClass: _containerClass,
    prefetch,
    noPrefetch,
    ...rest
  } = props;
  if (noPrefetch) return { ...rest, noPrefetch: true };
  return { ...rest, prefetch };
});
</script>

<template>
  <NuxtLink
    v-bind="nuxtLinkProps"
    class="inline"
    :class="{ 'cursor-text text-gray-300! hover:text-gray-300!': !props.to }"
  >
    <span class="inline-block min-w-0" :class="props.containerClass">
      <slot />
      <Icon
        v-if="props.to && props.target === '_blank'"
        name="ic:round-arrow-outward"
        size="0.75rem"
        class="ml-0.5 inline align-super"
      />
    </span>
  </NuxtLink>
</template>
