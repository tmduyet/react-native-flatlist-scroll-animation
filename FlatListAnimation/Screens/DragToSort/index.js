import React, {useEffect, useRef, useState} from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView,
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import faker from 'faker';
import Item, {Item_size} from './Item';
import Animated, {
  useAnimatedGestureHandler,
  runOnJS,
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  useAnimatedScrollHandler,
  withTiming,
  useAnimatedReaction,
} from 'react-native-reanimated';
import {PanGestureHandler} from 'react-native-gesture-handler';

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    id: faker.random.uuid(),
    image: faker.image.animals(),
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});

function clamp(value, lowerBound, upperBound) {
  'worklet';
  return Math.max(lowerBound, Math.min(value, upperBound));
}
function objectMove(object, from, to) {
  'worklet';
  const newObject = Object.assign({}, object);

  for (const id in object) {
    if (object[id] === from) {
      newObject[id] = to;
    }

    if (object[id] === to) {
      newObject[id] = from;
    }
  }

  return newObject;
}
function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter);
    counter--;
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

const MoveableItem = ({item, index, position, scrollY, listLength}) => {
  const [moving, setMoving] = useState(false);
  const top = useSharedValue(position.value[item.id] * Item_size);
  useAnimatedReaction(
    () => position.value[item.id],
    (currentPosition, previousPosition) => {
      if (currentPosition !== previousPosition) {
        if (!moving) {
          top.value = withSpring(currentPosition * Item_size);
        }
      }
    },
    [moving],
  );
  const gestureHandler = useAnimatedGestureHandler({
    onStart() {
      runOnJS(setMoving)(true);
    },
    onActive(event) {
      const positionY = event.absoluteY + scrollY.value;
      top.value = withTiming(positionY - Item_size, {
        duration: 16,
      });
      const newPosition = clamp(
        Math.floor(positionY / Item_size),
        0,
        listLength - 1,
      );

      if (newPosition != position.value[item.id]) {
        position.value = objectMove(
          position.value,
          position.value[item.id],
          newPosition,
        );
      }
    },
    onFinish() {
      top.value = position.value[item.id] * Item_size;
      runOnJS(setMoving)(false);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      left: 0,
      right: 0,
      top: top.value,
      zIndex: moving ? 1 : 0,
      shadowColor: 'black',
      shadowOffset: {
        height: 0,
        width: 0,
      },
      shadowOpacity: withSpring(moving ? 0.2 : 0),
      shadowRadius: 10,
    };
  }, [moving]);

  return (
    <Animated.View style={animatedStyle}>
      <PanGestureHandler onGestureEvent={gestureHandler}>
        <Animated.View style={{maxWidth: '90%'}}>
          <Item item={item} index={index}></Item>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};
function listToObject(list) {
  const values = Object.values(list);
  const object = {};

  for (let i = 0; i < values.length; i++) {
    object[values[i].id] = i;
  }
  return object;
}

export default DragToSort = () => {
  const position = useSharedValue(listToObject(DATA));
  const scrollY = useSharedValue(0);
  const handleScroll = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });
  return (
    <View style={styles.container}>
      <Animated.FlatList
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{flex: 1, position: 'relative', backgroundColor: '#fff'}}
        contentContainerStyle={{height: Item_size * DATA.length}}
        data={DATA}
        renderItem={({item, index}) => (
          <MoveableItem
            listLength={DATA.length}
            scrollY={scrollY}
            item={item}
            position={position}
            index={index}></MoveableItem>
        )}></Animated.FlatList>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
