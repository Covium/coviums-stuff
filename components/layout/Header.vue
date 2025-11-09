<script setup lang="ts">
const canvas = ref<HTMLCanvasElement | null>(null);
const headerText = ref<HTMLDivElement | null>(null);
let resizeTimeout: ReturnType<typeof setTimeout> | null = null;

const drawStars = () => {
  if (!headerText.value || !canvas.value) return;

  let STAR_COUNT = 100;
  if (window.innerWidth < 512) STAR_COUNT = 25;
  else if (window.innerWidth < 640) STAR_COUNT = 40;
  else if (window.innerWidth < 1024) STAR_COUNT = 75;

  const textRect = headerText.value.getBoundingClientRect();
  const canvasRect = canvas.value.getBoundingClientRect();

  canvas.value.width = canvas.value.offsetWidth;
  canvas.value.height = canvas.value.offsetHeight;

  const textLeft = textRect.left - canvasRect.left;
  const textTop = textRect.top - canvasRect.top;
  const textRight = textLeft + textRect.width;
  const textBottom = textTop + textRect.height;

  const ctx = canvas.value.getContext('2d');
  if (ctx) {
    ctx.fillStyle = '#fffce1';
    ctx.shadowColor = '#fffce1';
    for (let i = 0; i < STAR_COUNT; i++) {
      ctx.shadowBlur = Math.random() * 20;
      let x = Math.random() * canvas.value.width;
      let y = Math.random() * canvas.value.height;

      if (x >= textLeft && x <= textRight && y >= textTop && y <= textBottom) {
        const side = Math.floor(Math.random() * 4);
        if (side === 0) {
          x = Math.random() * textLeft;
        } else if (side === 1) {
          x = Math.random() * (canvas.value.width - textRight) + textRight;
        } else if (side === 2) {
          y = Math.random() * textTop;
        } else {
          y = Math.random() * (canvas.value.height - textBottom) + textBottom;
        }
      }

      const radius = Math.random() * 2 + 1;
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fill();
      canvas.value.style.opacity = '100';
    }
  }
};

const debouncedDrawStars = () => {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  if (canvas.value) canvas.value.style.opacity = '0';
  resizeTimeout = setTimeout(() => {
    drawStars();
  }, 250);
};

onMounted(() => {
  drawStars();
  window.addEventListener('resize', debouncedDrawStars);
});

onUnmounted(() => {
  if (resizeTimeout) clearTimeout(resizeTimeout);
  window.removeEventListener('resize', debouncedDrawStars);
});
</script>

<template>
  <header
    class="relative flex flex-col items-center justify-center overflow-clip bg-fuchsia-950 p-3.5 transition-[padding] sm:p-6 md:p-9"
  >
    <canvas
      ref="canvas"
      class="absolute top-0 left-0 h-full w-full transition-opacity"
    />

    <IconFox
      class="pointer-events-none absolute top-1/2 left-1/2 -translate-1/2 opacity-25 transition-[width,height] sm:h-39 sm:w-39 md:h-58.5 md:w-58.5"
    />

    <div ref="headerText" class="font-display z-10 text-center">
      <h1
        class="text-5xl transition-[font-size,line-height] sm:text-7xl md:text-8xl"
      >
        Covium's Stuff
      </h1>
      <p
        class="text-lg text-yellow-100 transition-[font-size,line-height] sm:text-3xl md:text-4xl"
      >
        Made with love and chronic anxiety
      </p>
    </div>
  </header>
</template>

<style scoped>
@reference 'tailwindcss';

.pattern {
  @apply absolute h-65 w-65 rounded-full bg-center bg-repeat opacity-25 transition-[translate,opacity] md:opacity-50 xl:opacity-75;
}
</style>
