import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import React, {useCallback} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Choice from './Choice';
const {width, height} = Dimensions.get('window');
export const CARD_HEIGHT = height / 1.5;
export const ACTION_OFFSET = 100;
export default function Card({
  swipe,
  name,
  source,
  isFirst,
  titleSign,
  ...rest
}) {
  const likeOpacity = swipe.x.interpolate({
    inputRange: [25, ACTION_OFFSET],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-ACTION_OFFSET, -25],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const superLikeOpcity = swipe.y.interpolate({
    inputRange: [-100, 0],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });
  const RenderChoice = useCallback(() => {
    return (
      <>
        <Animated.View
          style={[
            styles.ChoiceContainer,
            styles.RightChoice,
            {opacity: nopeOpacity},
          ]}>
          <Choice type={'Nope'}></Choice>
        </Animated.View>
        <Animated.View
          style={[
            styles.ChoiceContainer,
            styles.CenterChoice,
            {width: 300, opacity: superLikeOpcity},
          ]}>
          <Choice type={'SuperLike'}></Choice>
        </Animated.View>
        <Animated.View
          style={[
            styles.ChoiceContainer,
            styles.LeftChoice,
            {
              opacity: likeOpacity,
            },
          ]}>
          <Choice type={'Like'}></Choice>
        </Animated.View>
      </>
    );
  }, []);

  const rotate = Animated.multiply(swipe.x, titleSign).interpolate({
    inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
    outputRange: ['8deg', '0deg', '-8deg'],
  });
  const AnimatedSwipe = {
    transform: [{translateX: swipe.x}, {translateY: swipe.y}, {rotate}],
  };
  // ...swipe.getTranslateTransform()
  return (
    <Animated.View
      style={[styles.CardContainer, isFirst && AnimatedSwipe]}
      {...rest}>
      <Image style={styles.Image} source={{uri: source}}></Image>
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.7)']}
        style={styles.linearGradient}></LinearGradient>
      <Text style={styles.txtname}>{name}</Text>

      {isFirst && RenderChoice()}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  txtname: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    bottom: 30,
    left: 20,
  },
  linearGradient: {
    height: 100,
    width: '100%',
    position: 'absolute',
    bottom: 0,
  },
  Image: {
    width: '100%',
    height: '100%',
  },
  CardContainer: {
    width: width - 20,
    height: CARD_HEIGHT,
    position: 'absolute',
    borderRadius: 30,
    overflow: 'hidden',
    top: 50,
  },
  ChoiceContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 100,
    width: '40%',
    backgroundColor: 'rgba(0,0,0,.1)',
    borderRadius: 15,
  },
  LeftChoice: {
    left: 50,
    transform: [{rotate: '-30deg'}],
  },
  RightChoice: {
    right: 50,
    transform: [{rotate: '30deg'}],
  },
  CenterChoice: {
    alignSelf: 'center',
  },
});
