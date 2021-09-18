import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Character } from '../../models/character/character';
import { useStores } from '../../models/rootStore/rootStoreContext';

const CharactersListScreen = observer(() => {
  const { characterStore } = useStores();

  useEffect(() => {
    characterStore.fetchCharacters();
  }, [characterStore]);

  return (
    <FlatList
      data={[...characterStore.characters]}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <CharacterItem character={item} />}
    />
  );
});

const CharacterItem: React.FC<{ character: Character }> = observer(
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

export default CharactersListScreen;
