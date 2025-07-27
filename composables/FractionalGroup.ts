export type FractionalKey =
  | 'eighth'
  | 'sixth'
  | 'quarter'
  | 'threeEighths'
  | 'third'
  | 'half'
  | 'twoThirds'
  | 'fiveEighths'
  | 'threeQuarters'
  | 'fiveSixths'
  | 'sevenEighths';

interface FractionalEntry {
  label: string;
  value: string;
}

export type FractionalGroup = Partial<Record<FractionalKey, FractionalEntry>>;
