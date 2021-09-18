import { Instance, SnapshotIn, types } from 'mobx-state-tree';

export const CharacterModel = types
  .model('Character', {
    id: types.string,
    name: types.string,
    imageURL: types.string,
    type: types.optional(types.string, ''),
    isSelected: types.optional(types.boolean, false),
  })
  .views(self => ({
    get hasType() {
      return self.type !== '';
    },
  }))
  .actions(self => ({
    changedIsSelected() {
      self.isSelected = !self.isSelected;
    },
  }));

export type CharacterSnapshotIn = SnapshotIn<typeof CharacterModel>;
export type Character = Instance<typeof CharacterModel>;
