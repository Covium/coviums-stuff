<script setup lang="ts">
const { data: gamesWithMods } = await useAsyncData(() =>
  queryCollection('mods').order('sort', 'ASC').all(),
);

const getCollectionLink = (
  game: GameWithMods,
  collection: Collection,
): string =>
  `https://www.nexusmods.com/games/${game.slug}/collections/${collection.id}`;

const getModLink = (game: GameWithMods, mod: Mod): string => {
  const providers = {
    nexus: (slug: string, id: number): string =>
      `https://www.nexusmods.com/${slug}/mods/${id}`,
    moddb: (slug: string, id: number): string =>
      `https://www.moddb.com/mods/${slug}/downloads/${id}`,
  };

  if (mod.link) return mod.link;
  const fn =
    providers[mod.provider as keyof typeof providers] || providers.nexus;
  if (mod.id) return fn(game.slug, mod.id);
  return '#0';
};
</script>

<template>
  <CommonInfoBlock
    title="Mods"
    icon-name="ic:outline-build"
    description="My favorite modifications for my favorite games."
    class="col-span-2"
  >
    <div v-if="gamesWithMods && gamesWithMods.length" class="w-full">
      <CommonCollapsible
        v-for="(game, index) in gamesWithMods"
        :key="game.sort"
      >
        <template #trigger="{ isOpen }">
          <hr
            v-if="index"
            class="cursor-default border-t-2 border-fuchsia-700"
            @click.stop
          />
          <button
            class="hover:bg-obsidian-900 font-display flex w-full justify-between px-3 py-1.5 text-left text-lg transition-colors"
            :class="[isOpen ? 'bg-obsidian-900' : 'bg-fuchsia-950']"
          >
            {{ game.name }}
            <Icon
              name="ic:round-keyboard-arrow-right"
              class="shrink-0 transition-transform"
              :class="{ 'rotate-90': isOpen }"
              size="1.75rem"
            />
          </button>
        </template>

        <template #content>
          <dl class="px-3">
            <template
              v-for="collection in game.collections"
              :key="collection.name"
            >
              <dt class="text-yellow-200">
                <CommonLink
                  :to="getCollectionLink(game, collection)"
                  target="_blank"
                  class="link peer"
                >
                  {{ collection.name }}
                </CommonLink>
                <IconCollection class="icon peer-hover:text-yellow-50" />
              </dt>
              <dd>
                {{ collection.description }}
              </dd>
            </template>

            <template v-for="mod in game.mods" :key="mod.name">
              <dt class="text-yellow-100">
                <CommonLink
                  :to="getModLink(game, mod)"
                  target="_blank"
                  class="link peer"
                >
                  {{ mod.name }}
                </CommonLink>
                <IconMod class="icon peer-hover:text-yellow-50" />
              </dt>
              <dd>
                {{ mod.description }}
              </dd>
            </template>
          </dl>
        </template>
      </CommonCollapsible>
    </div>
  </CommonInfoBlock>
</template>

<style scoped>
@reference 'tailwindcss';

dt {
  @apply relative mt-2 indent-4;
}

dd {
  @apply mb-2 indent-2 text-sm italic;
}

.link {
  @apply transition-colors hover:text-yellow-50;
}

.icon {
  @apply absolute top-0 -left-2.5 size-6 transition-colors;
}
</style>
