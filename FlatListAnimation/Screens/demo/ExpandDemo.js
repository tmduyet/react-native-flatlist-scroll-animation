import {transform} from '@babel/core';
import React, {useRef, useEffect, useState} from 'react';
import {
  Animated,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const ExpandDemo = () => {
  const AnimatedValue = useRef(new Animated.Value(0)).current;
  const [yScale, setYScale] = useState(0);
  const [mode,setMode] = useState(false)
  const upHeight = AnimatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 100, 300],
  });
  const scale = AnimatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
  });
  const btnWidth = AnimatedValue.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: ['100%', '50%', "30%"],
  });

  const animation = toValue => {
    Animated.timing(AnimatedValue, {
      toValue,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };

  const handle_press = () => {
    console.log('press');
    setMode(!mode)
    setYScale(yScale === 1 ? 0 : 1);
    animation(yScale === 1 ? 0 : 1);
  };
  return (
    <View style={{flex: 1, padding: 10}}>
      <View style={[styles.expandContainer]}>
        <Animated.View
          style={[
            styles.upContainer,
            {
              height: upHeight,
              transform: [
                {
                  scale,
                },
              ],
            },
          ]}>
          <Text>xin chao</Text>
          <Text>xin chao</Text>
          <Text>xin chao</Text>
          <Text>xin chao</Text>
          <Text>xin chao</Text>
          <Button onPress={handle_press} title={'ok'}></Button>
        </Animated.View>
        <Animated.View style={[styles.chevButton,{width:btnWidth}]}>
          <TouchableOpacity onPress={handle_press}>
            {mode?
        <FontAwesome name={'home'}/>:<Text>tìm kiếm</Text>}
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  expandContainer: {
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 20,
    borderColor: 'black',
  },
  upContainer: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    alignItems: 'center',
  },
  chevButton: {
    width: '100%',
    height: 30,
    borderRadius: 1,
    backgroundColor: '#ffd359',
    alignSelf: 'flex-end',
  },
});
export default ExpandDemo;
