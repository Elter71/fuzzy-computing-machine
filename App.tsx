import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  SafeAreaView,
  View,
  FlatList,
} from 'react-native';
import { ICharacterModel, useCharacters } from './src/store';

export default observer(function App() {
  const characters = useCharacters();
  React.useEffect(() => {
    characters.fetchCharacters();
  }, [characters]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <FlatList
        data={[...characters.characters]}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <CharacterItem character={item} />}
      />
    </SafeAreaView>
  );
});

const CharacterItem: React.FC<{ character: ICharacterModel }> = observer(
  ({ character }) => {
    return (
      <TouchableOpacity style={characterItemStyle.container}>
        <Image
          borderRadius={25}
          style={characterItemStyle.avatar}
          source={{ uri: character.imageURL }}
        />
        <View style={characterItemStyle.textContainer}>
          <Text style={characterItemStyle.text}>{character.name}</Text>
          {character.hasType && (
            <Text style={characterItemStyle.textType}>{character.type}</Text>
          )}
        </View>
      </TouchableOpacity>
    );
  },
);

const characterItemStyle = StyleSheet.create({
  container: {
    padding: 15,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    height: 50,
    width: 50,
  },
  textContainer: {
    marginLeft: 16,
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: 'rgba(0, 0, 0, 0.87)',
  },
  textType: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.54)',
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
