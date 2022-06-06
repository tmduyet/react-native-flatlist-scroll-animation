import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import RoundButton from './RoundButton';
import {COLORS} from './Colors';

export default function Footer(props) {
  const nopeScale = props.swipe.x.interpolate({
    inputRange: [-100, -10],
    outputRange: [2, 1],
    extrapolate: 'clamp',
  });
  const nopeOpacity = props.swipe.x.interpolate({
    inputRange: [-150, -10],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const likeScale = props.swipe.x.interpolate({
    inputRange: [10, 100],
    outputRange: [1, 2],
    extrapolate: 'clamp',
  });
  const likeOpacity = props.swipe.x.interpolate({
    inputRange: [10, 150],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const superScale = props.swipe.y.interpolate({
    inputRange: [-150, 10],
    outputRange: [2, 1],
    extrapolate: 'clamp',
  });
  const superOpacity = props.swipe.y.interpolate({
    inputRange: [-150, 10],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  return (
    <View style={styles.container}>
      <RoundButton
        swipeStyle={{transform: [{scale: nopeScale}], opacity: nopeOpacity}}
        name="times"
        size={40}
        color={COLORS.Nope}
        onPress={() => props.handleChoice(-1)}></RoundButton>

      <RoundButton
        swipeStyle={{transform: [{scale: superScale}], opacity: superOpacity}}
        name="star"
        size={40}
        color={COLORS.SuperLike}
        onPress={() => props.handleChoice(2)}></RoundButton>
      <RoundButton
        swipeStyle={{transform: [{scale: likeScale}], opacity: likeOpacity}}
        name="heart"
        size={34}
        color={COLORS.Like}
        onPress={() => props.handleChoice(1)}></RoundButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 30,
    width: Dimensions.get('window').width/1.2,
  },
});
