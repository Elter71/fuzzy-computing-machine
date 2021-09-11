import { Instance, SnapshotIn, types, cast } from 'mobx-state-tree';

const API_URL = 'https://rickandmortyapi.com/api/character';

export interface ApiCharacterModel {
  info: Info;
  results: Result[];
}

export interface Info {
  count: number;
  pages: number;
  next: string;
  prev: null;
}

export interface Result {
  id: number;
  name: string;
  status: Status;
  species: Species;
  type: string;
  gender: Gender;
  origin: Location;
  location: Location;
  image: string;
  episode: string[];
  url: string;
  created: Date;
}

export enum Gender {
  Female = 'Female',
  Male = 'Male',
  Unknown = 'unknown',
}

export interface Location {
  name: string;
  url: string;
}

export enum Species {
  Alien = 'Alien',
  Human = 'Human',
}

export enum Status {
  Alive = 'Alive',
  Dead = 'Dead',
  Unknown = 'unknown',
}

const fetchCharacters = async () => {
  const response = await fetch(API_URL);
  return response.json() as unknown as ApiCharacterModel;
};

const CharacterModel = types
  .model('CharacterModel', {
    id: types.string,
    name: types.string,
    imageURL: types.string,
    type: types.optional(types.string, ''),
  })
  .views(self => ({
    get hasType() {
      return self.type !== '';
    },
  }));

export type CharacterSnapshotIn = SnapshotIn<typeof CharacterModel>;
export type ICharacterModel = Instance<typeof CharacterModel>;

const CharactersStore = types
  .model('CharactersStore', {
    characters: types.array(CharacterModel),
  })
  .actions(self => ({
    setCharacters(newCharacters: CharacterSnapshotIn[]) {
      self.characters = cast(newCharacters);
    },
    async fetchCharacters() {
      const data = await fetchCharacters();

      const characters = data.results.map(r => ({
        name: r.name,
        imageURL: r.image,
        id: r.id.toString(),
        type: r.type,
      }));

      this.setCharacters(characters);
    },
  }));

let characterStore: Instance<typeof CharactersStore>;

export const useCharacters = (): Instance<typeof CharactersStore> => {
  if (!characterStore) {
    characterStore = CharactersStore.create({ characters: [] });
  }

  return characterStore;
};
