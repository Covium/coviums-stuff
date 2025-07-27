export interface Mod {
  name: string;
  description: string;
  link?: string;
  provider?: string;
  id?: number;
}

export interface GameWithMods {
  name: string;
  sort: string;
  slug: string;
  mods: Array<Mod>;
}
