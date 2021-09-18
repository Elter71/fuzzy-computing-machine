import {
  FlatList,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { FontAwesome5 } from '@expo/vector-icons';
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
    const opacity = useSharedValue(0);
    const scale = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
      return {
        opacity: opacity.value,
        transform: [{ scale: scale.value }],
      };
    });

    useEffect(() => {
      if (character.isSelected) {
        scale.value = withTiming(1);
        opacity.value = withTiming(1);
      } else {
        opacity.value = withTiming(0);
        scale.value = withTiming(0);
      }
    }, [character.isSelected, opacity, scale]);

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={characterItemStyle.container}
        onPress={() => character.changedIsSelected()}
      >
        <ImageBackground
          borderRadius={25}
          style={[characterItemStyle.avatar]}
          source={{ uri: character.imageURL }}
        >
          <Animated.View
            style={[
              characterItemStyle.avatar,
              characterItemStyle.selectedAvatar,
              animatedStyles,
            ]}
          >
            <FontAwesome5 name="skull-crossbones" size={24} color="#b02d1a" />
          </Animated.View>
        </ImageBackground>
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
    borderRadius: 25,
  },
  selectedAvatar: {
    backgroundColor: 'rgba(243,243,243,0.53)',
    alignItems: 'center',
    justifyContent: 'center',
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
