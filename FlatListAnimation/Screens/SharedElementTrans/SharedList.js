import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {HEADER_DATA} from '../ImageHeader/Data';

import {SharedElement} from 'react-navigation-shared-element';

export default function SharedList(props) {
  return (
    <View style={styles.Container}>
      <TouchableOpacity onPress={() => props.navigation.navigate('Detail',{item:HEADER_DATA})}>
        <SharedElement id={`item.${HEADER_DATA.id}.photo`}>
          <Image
            style={{width: 100, height: 100}}
            source={HEADER_DATA.image}></Image>
        </SharedElement>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
