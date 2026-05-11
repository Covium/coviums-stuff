<script setup lang="ts">
import IconCollection from '~/components/icon/Collection.vue';
import IconMod from '~/components/icon/Mod.vue';

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

type GameModsListEntry = {
  kind: 'collection' | 'mod';
  key: string;
  name: string;
  description: string;
  href: string;
};

const getGameModsListEntries = (game: GameWithMods): GameModsListEntry[] => [
  ...(game.collections ?? []).map((c) => ({
    kind: 'collection' as const,
    key: `c:${c.id ?? c.name}`,
    name: c.name,
    description: c.description,
    href: getCollectionLink(game, c),
  })),
  ...(game.mods ?? []).map((m) => ({
    kind: 'mod' as const,
    key: `m:${m.id ?? m.name}`,
    name: m.name,
    description: m.description,
    href: getModLink(game, m),
  })),
];
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
          <dl>
            <template
              v-for="item in getGameModsListEntries(game)"
              :key="item.key"
            >
              <dt
                class="mt-2 pr-3 pl-1"
                :class="
                  item.kind === 'collection'
                    ? 'text-yellow-200'
                    : 'text-yellow-100'
                "
              >
                <CommonLink
                  :to="item.href"
                  target="_blank"
                  class="transition-colors hover:text-yellow-50"
                  container-class="relative pl-2 indent-4"
                >
                  <component
                    :is="item.kind === 'collection' ? IconCollection : IconMod"
                    class="pointer-events-none absolute top-0 -left-0.5 inline size-6 transition-colors"
                  />
                  {{ item.name }}
                </CommonLink>
              </dt>
              <dd class="mb-2 px-3 indent-2 text-sm italic">
                {{ item.description }}
              </dd>
            </template>
          </dl>
        </template>
      </CommonCollapsible>
    </div>
  </CommonInfoBlock>
</template>
