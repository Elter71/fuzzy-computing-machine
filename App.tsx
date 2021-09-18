import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import setupRootStore from './src/models/rootStore/setupRootStore';
import { RootStore } from './src/models/rootStore/rootStore';
import { RootStoreProvider } from './src/models/rootStore/rootStoreContext';
import CharactersListScreen from './src/screens/CharactersListScreen/CharactersListScreen';

export default function App() {
  const [rootStore, setRootStore] = useState<RootStore | undefined>(undefined);

  // Kick off initial async loading actions, like loading fonts and RootStore
  useEffect(() => {
    (async () => {
      setRootStore(setupRootStore());
    })();
  }, []);

  // Before we show the app, we have to wait for our state to be ready.
  // In the meantime, don't render anything. This will be the background
  // color set in native by rootView's background color. You can replace
  // with your own loading component if you wish.
  if (!rootStore) return null;

  return (
    <RootStoreProvider value={rootStore}>
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />
        <CharactersListScreen />
      </SafeAreaView>
    </RootStoreProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
