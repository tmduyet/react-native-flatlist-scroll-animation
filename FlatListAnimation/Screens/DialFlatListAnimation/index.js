import * as React from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
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

faker.seed(10);
const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    key: faker.random.uuid(),
    image: `https://randomuser.me/api/portraits/${faker.helpers.randomize([
      'women',
      'men',
    ])}/${faker.random.number(60)}.jpg`,
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email(),
  };
});
// Inspiration: https://dribbble.com/shots/14154226-Rolodex-Scrolling-Animation/attachments/5780833?mode=media
// Photo by Sharefaith from Pexels
// Background image: https://www.pexels.com/photo/pink-rose-closeup-photography-1231265/

const BG_IMAGE =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT48kqoBMIL-R6ZwD-LAbx7pHgYqXkVtajWwylljeKlYEymJ6OAQYBPWf6Euo_11iBfXUY&usqp=CAU'
const SPACING = 20;
const AVATAR_SIZE = 70;

const DialFlatListAnimation = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
    <Image
    source={{uri:BG_IMAGE}}
    style={StyleSheet.absoluteFillObject}
    blurRadius={80}
   ></Image>
      <FlatList
        data={DATA}
        keyExtractor={item => item.key}
        contentContainerStyle={{
          padding: SPACING,
          marginTop: 10,
        }}
        renderItem={({item, index}) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                padding: SPACING,
                marginBottom: SPACING,
                borderRadius: 12,
                backgroundColor: 'rgba(255,255,255,0.7)',
                shadowColor: 'black',
                shadowOpacity: 0.26,
                shadowOffset: {width: 0, height: 2},
                shadowRadius: 10,
                elevation: 3,
       
              }}>
              <Image
                source={{uri: item.image}}
                style={{
                  width: AVATAR_SIZE,
                  height: AVATAR_SIZE,
                  borderRadius: AVATAR_SIZE,
                  marginRight: SPACING / 2,
                }}
              />
              <View>
                <Text style={{fontSize: 22, fontWeight: '700'}}>
                  {item.name}
                </Text>
                <Text style={{fontSize: 14, opacity: 0.7}}>
                  {item.jobTitle}
                </Text>
                <Text style={{fontSize: 14, opacity: 0.7, color: '#0099cc'}}>
                  {item.email}
                </Text>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};
export default DialFlatListAnimation;
