<script setup lang="ts">
import { h } from 'vue';

const firstColor = ref('#fef9c2');
const secondColor = ref('#4b004f');

const interpolate = (a: number, b: number, numerator = 1, decimator = 2) => {
  return Math.round(a + (b - a) * (numerator / decimator));
};

const Hex2RGB = (Hex: string) => {
  Hex = Hex.replace('#', '');
  return {
    R: parseInt(Hex.substring(0, 2), 16),
    G: parseInt(Hex.substring(2, 4), 16),
    B: parseInt(Hex.substring(4, 6), 16),
  };
};

const RGB2Hex = (RGB: { R: number; G: number; B: number }) => {
  let Hex = '';
  Hex += RGB.R.toString(16).padStart(2, '0');
  Hex += RGB.G.toString(16).padStart(2, '0');
  Hex += RGB.B.toString(16).padStart(2, '0');
  return '#' + Hex;
};

const getMidpoint = (numerator = 1, decimator = 2) => {
  const firstRGB = Hex2RGB(firstColor.value);
  const secondRGB = Hex2RGB(secondColor.value);

  const middleRGB = {
    R: interpolate(firstRGB.R, secondRGB.R, numerator, decimator),
    G: interpolate(firstRGB.G, secondRGB.G, numerator, decimator),
    B: interpolate(firstRGB.B, secondRGB.B, numerator, decimator),
  };

  return RGB2Hex(middleRGB);
};

const getFractionalMidpoints = (
  allowedKeys: Array<FractionalKey> = [],
): Array<FractionalGroup> => {
  const multOf2: FractionalGroup = {
    eighth: { label: '⅛', value: getMidpoint(1, 8) },
    quarter: { label: '¼', value: getMidpoint(1, 4) },
    threeEighths: { label: '⅜', value: getMidpoint(3, 8) },
    half: { label: '½', value: getMidpoint(1, 2) },
    fiveEighths: { label: '⅝', value: getMidpoint(5, 8) },
    threeQuarters: { label: '¾', value: getMidpoint(3, 4) },
    sevenEighths: { label: '⅞', value: getMidpoint(7, 8) },
  };

  const multOf3: FractionalGroup = {
    sixth: { label: '⅙', value: getMidpoint(1, 6) },
    third: { label: '⅓', value: getMidpoint(1, 3) },
    twoThirds: { label: '⅔', value: getMidpoint(2, 3) },
    fiveSixths: { label: '⅚', value: getMidpoint(5, 6) },
  };

  if (!allowedKeys.length) return [multOf2, multOf3];

  const result: [FractionalGroup, FractionalGroup] = [{}, {}];

  for (const key of allowedKeys) {
    if (key in multOf2) result[0][key] = multOf2[key];
    else if (key in multOf3) result[1][key] = multOf3[key];
  }

  return result;
};

const middleColors = computed<Array<FractionalGroup>>(() => {
  switch (depthLevel.current.value) {
    case 2:
      return getFractionalMidpoints();
    case 1:
    default:
      return getFractionalMidpoints([
        'quarter',
        'third',
        'half',
        'twoThirds',
        'threeQuarters',
      ]);
  }
});

const depthLevel = { min: 1, max: 2, current: ref(1) };

const changeDepthLevel = (action: 'add' | 'subtract') => {
  if (action === 'add' && depthLevel.current.value < depthLevel.max)
    depthLevel.current.value++;
  else if (action === 'subtract' && depthLevel.current.value > depthLevel.min)
    depthLevel.current.value--;
};

const isBright = (Hex: string) => {
  const RGB = Hex2RGB(Hex);
  return Math.round((RGB.R * 299 + RGB.G * 587 + RGB.B * 114) / 1000) > 125;
};

const { addToast } = useToast();

const copyColor = (color: string) => {
  navigator.clipboard.writeText(color);
  addToast(
    h('span', [
      'Color ',
      h('code', {
        innerHTML: color,
        style: {
          backgroundColor: color,
          borderRadius: '0.25rem',
          color: isBright(color) ? 'var(--color-obsidian-950)' : 'white',
          padding: '0 0.25rem',
        },
      }),
      ' copied!',
    ]),
  );
};
</script>

<template>
  <CommonInfoBlock
    title="Color Blender"
    icon-name="ic:outline-color-lens"
    description="Shows intermediate colors between two specified ones."
  >
    <div class="flex w-full flex-col items-center gap-4 p-4">
      <div class="flex h-fit overflow-clip rounded-full">
        <button
          class="change-depth-button"
          :disabled="depthLevel.current.value === depthLevel.max"
          @click="changeDepthLevel('add')"
        >
          <Icon name="ic:round-plus" size="1.5rem" />
        </button>
        <button
          class="change-depth-button"
          :disabled="depthLevel.current.value === depthLevel.min"
          @click="changeDepthLevel('subtract')"
        >
          <Icon name="ic:round-minus" size="1.5rem" />
        </button>
      </div>

      <div class="flex w-full justify-center-safe overflow-auto">
        <div class="flex w-fit items-center gap-x-1">
          <ColorPicker
            v-slot="{ show }"
            v-model="firstColor"
            with-initial-color
            with-hex-input
            with-rgb-input
            :with-colors-history="4"
            class="h-full"
          >
            <button
              class="color-block h-full"
              :style="{ backgroundColor: firstColor }"
              @click="show"
            >
              <div
                class="-rotate-90 text-sm"
                :style="{
                  color: isBright(firstColor)
                    ? 'var(--color-obsidian-950)'
                    : 'white',
                }"
              >
                start
              </div>
            </button>
          </ColorPicker>

          <div class="flex flex-col gap-y-1">
            <div
              v-for="(group, index) in middleColors"
              :key="index"
              class="flex justify-stretch gap-x-1"
            >
              <button
                v-for="(color, key) in group"
                :key="key"
                class="color-block flex grow items-center justify-center select-none"
                :style="{ backgroundColor: color!.value }"
                @click="copyColor(color!.value)"
              >
                <span
                  :style="{
                    color: isBright(color!.value)
                      ? 'var(--color-obsidian-950)'
                      : 'white',
                  }"
                >
                  {{ color!.label }}
                </span>
              </button>
            </div>
          </div>

          <ColorPicker
            v-slot="{ show }"
            v-model="secondColor"
            with-initial-color
            with-hex-input
            with-rgb-input
            :with-colors-history="4"
            class="h-full"
          >
            <button
              class="color-block h-full"
              :style="{ backgroundColor: secondColor }"
              @click="show"
            >
              <div
                class="rotate-90 text-sm"
                :style="{
                  color: isBright(secondColor)
                    ? 'var(--color-obsidian-950)'
                    : 'white',
                }"
              >
                end
              </div>
            </button>
          </ColorPicker>
        </div>
      </div>
    </div>
  </CommonInfoBlock>
</template>

<style scoped>
@reference "tailwindcss";

.color-block {
  @apply min-h-8 min-w-8 overflow-clip rounded-sm inset-ring;
}

.change-depth-button {
  @apply h-6 w-6 bg-fuchsia-700;
}

.change-depth-button:disabled {
  @apply cursor-not-allowed bg-fuchsia-900;
}
</style>
