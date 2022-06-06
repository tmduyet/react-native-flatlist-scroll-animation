import {
  Animated,
  Dimensions,
  Image,
  PanResponder,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useRef, useState, useCallback, useEffect} from 'react';
import faker from 'faker';
import Card, {ACTION_OFFSET, CARD_HEIGHT} from './Card';
import Footer from './Footer';

const {width, height} = Dimensions.get('screen');

faker.seed(10);

const data = [...Array(3).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: faker.image.animals(width - 20, height, true),
    name: faker.animal.cat(),
  };
});
export default function TinderSwipe() {
  const [DATA, setDATA] = useState(data);
  const swipe = useRef(new Animated.ValueXY()).current;
  const titleSign = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (DATA.length == 0) {
      setDATA(data);
    }
  }, [DATA.length]);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy, y0}) => {
      swipe.setValue({x: dx, y: dy});
      titleSign.setValue(y0 > CARD_HEIGHT / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, {dx, dy}) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > ACTION_OFFSET;
      const isSuperLike = Math.abs(dy) > CARD_HEIGHT / 2;
      if (isSuperLike) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: dx,
            y: -height,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else if (isActionActive) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: direction * 500,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeTopCard = useCallback(() => {
    setDATA(pev => pev.slice(1));
    swipe.setValue({x: 0, y: 0});
  }, [swipe]);

  const handleChoice = useCallback(
    direction => {
      if (direction == 2) {
        Animated.timing(swipe.y, {
          duration: 200,
          toValue:-height,
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        Animated.timing(swipe.x, {
          toValue: direction * 500,
          duration: 200,
          useNativeDriver: true,
        }).start(removeTopCard);
      }
    },
    [removeTopCard, swipe.x, swipe.y],
  );

  return (
    <View style={styles.Container}>
      <View style={styles.CardContainer}>
        {DATA.map((item, index) => {
          const isFirst = index === 0;
          const dragHandler = isFirst ? panResponder.panHandlers : {};
          return (
            <Card
              {...dragHandler}
              isFirst={isFirst}
              name={item.name}
              swipe={swipe}
              titleSign={titleSign}
              source={item.image}
              key={item.key}></Card>
          );
        }).reverse()}
        <Footer swipe={swipe} handleChoice={handleChoice}></Footer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  CardContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
