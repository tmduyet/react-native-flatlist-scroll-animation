/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import DialFlatListAnimation from './Screens/DialFlatListAnimation';

const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <DialFlatListAnimation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default App;
