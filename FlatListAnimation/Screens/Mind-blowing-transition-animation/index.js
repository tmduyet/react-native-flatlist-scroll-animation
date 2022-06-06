import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CIRCLE_SIZE = 100;
const Circle = ({onPress, animatedValue}) => {
  var theNumber=0
  const inputRange = [0, 0.001, 0.5, 0.5001, 1];
  const containerBg = animatedValue.interpolate({
    inputRange,
    outputRange: ['gold', 'gold', 'gold', '#444', '#444'],
  });
  const circleBg = animatedValue.interpolate({
    inputRange,
    outputRange: ['#444', '#444', '#444', 'gold', 'gold'],
  });
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFillObject,
        styles.circelContainer,
        {backgroundColor: containerBg},
      ]}>
      <Animated.View
        style={[
          styles.circle,

          {
            backgroundColor: circleBg,
            transform: [
              {
                perspective: 400,
              },
              {
                rotateY: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [
                    '0deg',
                    '-90deg',
                    '-180deg',
                  ],
              
                }),
              },
              {
                scale: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
                  outputRange: [1, 8, 1, 8, 1, 8, 1],
                }),
              },
              {
                translateX: animatedValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [0, 0.5, 1],
                }),
              },
            ],
          },
        ]}>
        <TouchableOpacity onPress={onPress}>
          <View style={[styles.circle, styles.circleButton]}>
            <FontAwesome
              name="arrow-right"
              size={28}
              color="white"></FontAwesome>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const MindBlowingAnimated = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [index, setIndex] = useState(0);
  const animation = toValue => {
    Animated.timing(animatedValue, {
      toValue,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };
  const onPress = () => {
    setIndex(index === 1? 0 : 1);
    animation(index);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden></StatusBar>
      <Circle onPress={onPress} animatedValue={animatedValue}></Circle>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  circelContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 8,
    paddingBottom: 100,
    backgroundColor: 'gold',
  },
  circle: {
    backgroundColor: '#444',
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
  },
  circleButton: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default MindBlowingAnimated;
