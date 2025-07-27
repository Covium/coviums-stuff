<template>
  <div
    class="bg-obsidian-900 flex min-h-svh w-full flex-col overflow-x-clip text-white"
  >
    <LayoutHeader class="shrink-0" />
    <div class="grow">
      <slot />
    </div>

    <LayoutToasts />
  </div>
</template>
