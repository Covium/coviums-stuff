export interface Mod {
  name: string;
  description: string;
  link?: string;
  provider?: string;
  id?: number;
}

export interface Collection {
  name: string;
  description: string;
  link?: string;
  provider?: string;
  id?: string;
}

export interface GameWithMods {
  name: string;
  sort: string;
  slug: string;
  collections: Array<Collection>;
  mods: Array<Mod>;
}
