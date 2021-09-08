import React, {useRef, useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  Animated,
  StatusBar,
  FlatList,
} from 'react-native';
import data from './data';

const {width, height} = Dimensions.get('window');
const LOGO_WIDTH = 220;
const LOGO_HEIGHT = 40;
const DOT_SIZE = 40;
const TICKER_HEIGHT = 40;
const CIRCLE_SIZE = width * 0.6;

const Item = ({imageUri, heading, description, index, scrollX}) => {
  const inputRange = [(index - 1) * width, index * width, (index + 1) * width];
  const inputRangeOpacity = [
    (index - 0.7) * width,
    index * width,
    (index + 0.7) * width,
  ];
  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0, 1, 0],
  });
  const translateXHeading = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.2, 0, -width * 0.2],
  });
  const translateXDescription = scrollX.interpolate({
    inputRange,
    outputRange: [width * 0.6, 0, -width * 0.6],
  });
  const opacity = scrollX.interpolate({
    inputRange: inputRangeOpacity,
    outputRange: [0, 1, 0],
  });
  return (
    <View style={[styles.imageStyle]}>
      <Animated.Image
        source={imageUri}
        style={[
          styles.imageStyle,
          {
            opacity,
            transform: [{scale}],
          },
        ]}></Animated.Image>
      <View style={styles.textContainer}>
        <Animated.Text
          style={[
            styles.heading,
            {
              opacity,
              transform: [
                {
                  translateX: translateXHeading,
                },
              ],
            },
          ]}>
          {heading}
        </Animated.Text>
        <Animated.Text
          style={[
            styles.description,
            {
              opacity,
              transform: [
                {
                  translateX: translateXDescription,
                },
              ],
            },
          ]}>
          {description}
        </Animated.Text>
      </View>
    </View>
  );
};
const Pagination = () => {
  return (
    <View style={styles.pagination}>
      {data.map(item => {
        return (
          <View key={item.key} style={styles.paginationDotContainer}>
            <View
              style={[
                styles.paginationDot,
                {backgroundColor: item.color},
              ]}></View>
          </View>
        );
      })}
    </View>
  );
};
const AdvanceFlatListAnimated = () => {
  const scrollX = useRef(new Animated.Value(0)).current;
  return (
    <View style={styles.container}>
      <StatusBar style="auto" hidden />
      <Animated.FlatList
        keyExtractor={item => item.key}
        data={data}
        renderItem={({item, index}) => (
          <Item {...item} index={index} scrollX={scrollX}></Item>
        )}
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        horizontal
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {
            useNativeDriver: true,
          },
        )}
        scrollEventThrottle={16}></Animated.FlatList>
      <Image
        style={styles.logo}
        source={require('./assets/ue_black_logo.png')}
      />
      <Pagination />
    </View>
  );
};

export default AdvanceFlatListAnimated;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemStyle: {
    width,
    height,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageStyle: {
    width: width,
    height: width,
    resizeMode: 'contain',
    flex: 1,
  },
  textContainer: {
    alignItems: 'flex-start',
    alignSelf: 'flex-end',
    flex: 0.5,
  },
  heading: {
    color: '#444',
    textTransform: 'uppercase',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 2,
    marginBottom: 5,
  },
  description: {
    color: '#ccc',
    fontWeight: '600',
    textAlign: 'left',
    width: width * 0.75,
    marginRight: 10,
    fontSize: 16,
    lineHeight: 16 * 1.5,
  },
  logo: {
    opacity: 0.9,
    height: LOGO_HEIGHT,
    width: LOGO_WIDTH,
    resizeMode: 'contain',
    position: 'absolute',
    left: 10,
    bottom: 10,
    transform: [
      {translateX: -LOGO_WIDTH / 2},
      {translateY: -LOGO_HEIGHT / 2},
      {rotateZ: '-90deg'},
      {translateX: LOGO_WIDTH / 2},
      {translateY: LOGO_HEIGHT / 2},
    ],
  },
  pagination: {
    position: 'absolute',
    right: 20,
    bottom: 40,
    flexDirection: 'row',
    height: DOT_SIZE,
  },
  paginationDot: {
    width: DOT_SIZE * 0.3,
    height: DOT_SIZE * 0.3,
    borderRadius: DOT_SIZE * 0.15,
  },
  paginationDotContainer: {
    width: DOT_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationIndicator: {
    width: DOT_SIZE,
    height: DOT_SIZE,
    borderRadius: DOT_SIZE / 2,
    borderWidth: 2,
    borderColor: '#ddd',
  },
  tickerContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    overflow: 'hidden',
    height: TICKER_HEIGHT,
  },
  tickerText: {
    fontSize: TICKER_HEIGHT,
    lineHeight: TICKER_HEIGHT,
    textTransform: 'uppercase',
    fontWeight: '800',
  },

  circleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
    top: '15%',
  },
});
