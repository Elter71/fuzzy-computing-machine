import { Instance, types } from 'mobx-state-tree';
import { CharactersStoreModel } from '../characterStore/characterStore';

export const RootStoreModel = types.model('RootStore').props({
  characterStore: types.optional(CharactersStoreModel, {}),
});

export type RootStore = Instance<typeof RootStoreModel>;
