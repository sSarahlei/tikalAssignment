interface CharacterInfo {
  created: string;
  episode: Array<string>;
  gender: CharacterGender;
  id: number;
  image: string;
  location: { name: string; url: string };
  name: string;
  origin: CharacterOrigin;
  species: CharacterSpecies;
  status: CharacterStatus;
  url: string;
}

interface CharacterEpisode {
  info: ApiInfo;
  results: CharacterEpisodeInfo[];
}

interface CharacterEpisodeInfo {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters: [];
}

interface CharacterLocationInfo {
  id: number;
  name: string;
  type: LocationType;
  dimension: string;
  residents: Array<string>;
}

interface CharacterOrigin {
  name: string;
  url: string;
}

interface ApiInfo {
  count: number;
  pages: number;
  next: string;
  prev: string;
}

type CharacterGender = "male" | "female";
type CharacterSpecies = "Human" | "Alien";
type CharacterStatus = "Alive" | "unknown" | "Dead";
type LocationType = "Planet";
type ResourceType = "location" | "character" | "episode";
