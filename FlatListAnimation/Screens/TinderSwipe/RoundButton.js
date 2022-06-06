import {
  Animated,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from 'react-native';
import React, {useRef, useCallback} from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
export default function RoundButton(props) {
  const scale = useRef(new Animated.Value(1)).current;

  const animatedScale = useCallback(newValue => {
    Animated.spring(scale, {
      toValue: newValue,
      friction: 4,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <TouchableNativeFeedback
      delayPressIn={0}
      delayPressOut={100}
      onPressIn={() => animatedScale(0.8)}
      onPressOut={() => {
        props.onPress();
        animatedScale(1);
      }}>
      <Animated.View style={[styles.IconContainer, {transform: [{scale}]},props.swipeStyle]}>
        <FontAwesome
          color={props.color}
          name={props.name}
          size={props.size}></FontAwesome>
      </Animated.View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  IconContainer: {
    width: 70,
    height: 70,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    backgroundColor: '#fff',
    elevation: 5,
  },
});
