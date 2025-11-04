<script setup lang="ts">
const { data: gamesWithMods } = await useAsyncData(() =>
  queryCollection('mods').order('sort', 'ASC').all(),
);

const getModLink = (game: GameWithMods, mod: Mod): string => {
  const providers = {
    nexus: (slug: string, id: number): string =>
      `https://www.nexusmods.com/${slug}/mods/${id}`,
    moddb: (slug: string, id: number): string =>
      `https://www.moddb.com/mods/${slug}/downloads/${id}`,
  };

  if (mod.link) return mod.link;
  else if (mod.provider && typeof mod.id === 'number') {
    const fn = providers[mod.provider as keyof typeof providers];
    if (fn) return fn(game.slug, mod.id);
  }
  return '#0';
};
</script>

<template>
  <CommonInfoBlock
    title="Mods"
    icon-name="ic:outline-build"
    description="My favorite mods for my favorite games."
    class="col-span-2"
  >
    <div v-if="gamesWithMods && gamesWithMods.length" class="w-full">
      <CommonCollapsible v-for="(game, index) in gamesWithMods" :key="game.id">
        <template #trigger="{ isOpen }">
          <hr
            v-if="index"
            class="cursor-default border-t-2 text-fuchsia-700"
            @click.stop
          />
          <button
            class="hover:bg-obsidian-900 flex w-full justify-between px-3 py-2 text-left text-lg transition-[background-color]"
            :class="[isOpen ? 'bg-obsidian-900' : 'bg-fuchsia-950']"
          >
            {{ game.name }}
            <Icon
              name="ic:round-keyboard-arrow-right"
              class="shrink-0 transition-[rotate]"
              :class="{ 'rotate-90': isOpen }"
              size="1.75rem"
            />
          </button>
        </template>

        <template #content>
          <dl>
            <template v-for="mod in game.mods" :key="mod.name">
              <dt class="mt-2 pr-3 pl-7">
                <CommonLink
                  :to="getModLink(game, mod)"
                  target="_blank"
                  class="text-md text-yellow-100"
                >
                  {{ mod.name }}
                </CommonLink>
              </dt>
              <dd class="mb-2 px-3 indent-2 text-sm italic">
                {{ mod.description }}
              </dd>
            </template>
          </dl>
        </template>
      </CommonCollapsible>
    </div>
  </CommonInfoBlock>
</template>
