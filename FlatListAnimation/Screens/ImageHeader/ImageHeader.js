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
import React, {useRef} from 'react';
import {HEADER_DATA} from './Data';
import TopNavigation from './TopNavigation';
const {width, height} = Dimensions.get('window');
export const BANNER_H = 400;
export const TOPNAVI_H = 50;
export default function ImageHeader(props) {
  const scrollA = useRef(new Animated.Value(0)).current;

  return (
    <View style={{flex: 1}}>
      <TopNavigation navigation={props.navigation} title="Shiba Inu" scrollA={scrollA} />
      <Animated.ScrollView
      showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: scrollA}}}],
          {useNativeDriver: true},
        )}
        scrollEventThrottle={16}>
        <View style={styles.bannerContainer}>
          <Animated.Image
          resizeMode={'cover'}
            style={styles.banner(scrollA)}
            source={HEADER_DATA.image}
          />
        </View>

        <Text style={{fontSize: 20}}>{HEADER_DATA.content}</Text>
      </Animated.ScrollView>
    </View>
  );
}
const styles = {
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
