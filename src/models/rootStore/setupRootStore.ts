import { RootStore, RootStoreModel } from './rootStore';

const setupRootStore = (): RootStore => {
  return RootStoreModel.create();
};

export default setupRootStore;
