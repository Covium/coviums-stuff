<template>
  <div class="flex min-h-svh w-full flex-col overflow-x-clip text-white">
    <LayoutHeader class="shrink-0" />
    <div class="relative grow overflow-hidden">
      <div
        class="pointer-events-none absolute inset-0 bg-white/3 mask-[url('/assets/icons/Diagonals.svg')] mask-size-[13px] mask-top-left mask-repeat"
      />
      <div class="relative z-0">
        <slot />
      </div>
    </div>

    <LayoutToasts />
  </div>
</template>
