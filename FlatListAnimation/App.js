import React, {lazy} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import DialFlatListAnimation from './Screens/DialFlatListAnimation';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MindBlowingAnimated from './Screens/Mind-blowing-transition-animation';
import AdvanceFlatListAnimated from './Screens/AdvanceFlatlistAnimated';
import ExpandDemo from './Screens/demo/ExpandDemo';
import TinderSwipe from './Screens/TinderSwipe/TinderSwipe';
import ImageHeader from './Screens/ImageHeader/ImageHeader';
import SharedElementTrans from './Screens/SharedElementTrans';

function HomeScreen(props) {
  return (
    <View style={{flex: 1}}>
      <Button
        onPress={() => {
          props.navigation.navigate('DialFlatListAnimation');
        }}
        title={'Animation flatlist dial'}
      />
      <Button
        onPress={() => {
          props.navigation.navigate('MindBlowingAnimated');
        }}
        title={'Mind Blowing Animated'}
      />
      <Button
        onPress={() => {
          props.navigation.navigate('AdvanceFlatListAnimated');
        }}
        title={'Advance Flat List Animated'}
      />
      <Button
        onPress={() => {
          props.navigation.navigate('ExpandDemo');
        }}
        title={'Expand Demo'}
      />
      <Button
        onPress={() => {
          props.navigation.navigate('TinderSwipe');
        }}
        title={'Tinder Swipe'}
      />
      {/* <Button
        onPress={() => {
          props.navigation.navigate('ImageHeader');
        }}
        title={'Image Header'}
      /> */}
      <Button
        onPress={() => {
          props.navigation.navigate('SharedElementTrans');
        }}
        title={'SharedElementTrans'}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="DialFlatListAnimation"
          component={DialFlatListAnimation}
        />
        <Stack.Screen
          name="MindBlowingAnimated"
          component={MindBlowingAnimated}
        />
        <Stack.Screen
          name="AdvanceFlatListAnimated"
          component={AdvanceFlatListAnimated}
        />
        <Stack.Screen name="ExpandDemo" component={ExpandDemo} />
        <Stack.Screen name="TinderSwipe" component={TinderSwipe} />
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="SharedElementTrans"
          component={SharedElementTrans}
        />

        {/* <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="ImageHeader"
          component={ImageHeader}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
