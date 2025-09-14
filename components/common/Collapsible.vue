<script setup lang="ts">
const content = ref<HTMLDivElement | null>(null);

const calculateHeight = () => {
  if (!content.value) return;
  content.value.style.maxHeight = content.value.scrollHeight + 'px';
};

onMounted(() => {
  nextTick(() => {
    calculateHeight();
  });

  window.addEventListener('resize', calculateHeight);
});

onUnmounted(() => {
  window.removeEventListener('resize', calculateHeight);
});

const isOpen = ref(false);
const toggle = () => {
  if (!isOpen.value) {
    calculateHeight();
  }
  isOpen.value = !isOpen.value;
};
</script>

<template>
  <div>
    <div class="cursor-pointer" @click="toggle">
      <slot name="trigger" :is-open="isOpen" />
    </div>
    <div
      ref="content"
      class="overflow-hidden transition-[max-height]"
      :class="{ '!max-h-0': !isOpen }"
    >
      <slot name="content" />
    </div>
  </div>
</template>
