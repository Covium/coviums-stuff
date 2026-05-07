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
      <CommonCollapsible v-for="(game, index) in gamesWithMods" :key="game.id">
        <template #trigger="{ isOpen }">
          <button
            class="hover:bg-obsidian-900 font-display flex w-full justify-between px-3 py-1.5 text-left text-lg transition-colors"
            :class="[
              isOpen ? 'bg-obsidian-900' : 'bg-fuchsia-950',
              { 'border-t-2 border-fuchsia-700': index },
            ]"
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
          <dl>
            <template
              v-for="collection in game.collections"
              :key="collection.name"
            >
              <dt class="relative mt-2 pr-3 pl-7 text-yellow-200">
                <CommonLink
                  :to="getCollectionLink(game, collection)"
                  target="_blank"
                  class="peer text-md transition-colors hover:text-yellow-50"
                >
                  {{ collection.name }}
                </CommonLink>
                <IconCollection
                  class="absolute top-0 left-0.5 size-6 transition-colors peer-hover:text-yellow-50"
                />
              </dt>
              <dd class="mb-2 px-3 indent-2 text-sm italic">
                {{ collection.description }}
              </dd>
            </template>

            <template v-for="mod in game.mods" :key="mod.name">
              <dt class="relative mt-2 pr-3 pl-7 text-yellow-100">
                <CommonLink
                  :to="getModLink(game, mod)"
                  target="_blank"
                  class="peer text-md transition-colors hover:text-yellow-50"
                >
                  {{ mod.name }}
                </CommonLink>
                <IconMod
                  class="absolute top-0 left-0.5 size-6 transition-colors peer-hover:text-yellow-50"
                />
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
