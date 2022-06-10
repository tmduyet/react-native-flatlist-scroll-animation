import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  StatusBar,
  Animated,
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {HEADER_DATA} from './Data';
import TopNavigation from './TopNavigation';
import {SharedElement} from 'react-navigation-shared-element';
const {width, height} = Dimensions.get('window');
export const BANNER_H = 400;
export const TOPNAVI_H = 50;
export default function ImageHeader(props) {
  const {item} = props.route.params;
  const scrollA = useRef(new Animated.Value(0)).current;
  const textAppear = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(textAppear, {
      duration: 200,
      toValue: 1,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <View style={{flex: 1}}>
      <TopNavigation
        navigation={props.navigation}
        onPress={() => {
          Animated.timing(textAppear, {
            duration: 200,
            toValue: 0,
            useNativeDriver: true,
          }).start();
        }}
        title="Shiba Inu"
        scrollA={scrollA}
      />
      <Animated.ScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollA}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}>
        <View style={styles.bannerContainer}>
          <SharedElement id={`item.${item.id}.photo`}>
            <Image
              resizeMode={'cover'}
              style={{height: 400, width: width}}
              source={HEADER_DATA.image}
            />
            {/* <Animated.Image
              resizeMode={'cover'}
              style={styles.banner(scrollA)}
              source={HEADER_DATA.image}
            />  */}
          </SharedElement>
        </View>
        <Animated.View style={styles.TextTrans(textAppear)}>
          <Text style={{fontSize: 20}}>{HEADER_DATA.content}</Text>
        </Animated.View>
      </Animated.ScrollView>
    </View>
  );
}
const styles = {
  TextTrans: textAppear => {
    return {
      height: 'auto',
      width: '100%',
      transform: [
        {
          translateY: textAppear.interpolate({
            inputRange: [0, 1],
            outputRange: [height, 0],
          }),
        },
      ],
    };
  },
  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: 'center',
    overflow: 'hidden',
  },
  banner: scrollA => ({
    height: BANNER_H,
    width: '200%',
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.75, BANNER_H * 0.75],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [2, 1, 0.5, 0.5],
        }),
      },
    ],
  }),
};
