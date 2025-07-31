<template>
  <header
    class="relative flex flex-col items-center justify-center overflow-clip bg-fuchsia-950 p-3.5 transition-[padding] sm:p-6 md:p-9"
  >
    <IconFox
      class="absolute top-1/2 left-1/2 -translate-1/2 opacity-25 transition-[width,height] sm:h-39 sm:w-39 md:h-58.5 md:w-58.5"
    />
    <div
      class="pattern -top-13 left-0 -translate-x-1/2 bg-[url(/assets/icons/Marker.svg)] xl:-left-13 xl:translate-x-0"
    />
    <div
      class="pattern right-0 -bottom-13 translate-x-1/2 bg-[url(/assets/icons/Diagonals.svg)] xl:-right-13 xl:translate-x-0"
    />

    <h1
      class="font-display text-center text-5xl transition-[font-size,line-height] sm:text-7xl md:text-8xl"
    >
      Covium's Stuff
    </h1>
    <p
      class="font-display text-center text-lg text-yellow-100 transition-[font-size,line-height] sm:text-3xl md:text-4xl"
    >
      Made with love and chronic anxiety
    </p>
  </header>
</template>

<style scoped>
@reference 'tailwindcss';

.pattern {
  @apply absolute h-65 w-65 rounded-full bg-center bg-repeat opacity-25 transition-[translate,opacity] md:opacity-50 xl:opacity-75;
}
</style>
