
import React from 'react';
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
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MindBlowingAnimated from './Screens/Mind-blowing-transition-animation';
import AdvanceFlatListAnimated from './Screens/AdvanceFlatlistAnimated';
function HomeScreen(props) {
  console.log('props',props);
  return (
    <View style={{ flex: 1}}>
      <Button onPress={()=>{props.navigation.navigate('DialFlatListAnimation')}} title={'Animation flatlist dial'}/>
    </View>
  );
}

const Stack = createNativeStackNavigator();
const App = () => {
  return (
  //   <NavigationContainer
  //   >
  //   <Stack.Navigator>
  //     <Stack.Screen name="Home" component={HomeScreen} />
  //     <Stack.Screen name="DialFlatListAnimation" component={DialFlatListAnimation} />
  //   </Stack.Navigator>
  // </NavigationContainer>
  // <MindBlowingAnimated></MindBlowingAnimated>
  <AdvanceFlatListAnimated></AdvanceFlatListAnimated>
  );
};

const styles = StyleSheet.create({});

export default App;
