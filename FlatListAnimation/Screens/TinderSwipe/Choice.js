import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from './Colors';

export default function Choice(props) {
  const color = COLORS[props.type];
  console.log(color);
  return (
    <View style={[styles.Container, {borderColor: color}]}>
      <Text style={[styles.txtChoice, {color: color}]}>{props.type}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    padding: 5,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    borderWidth: 5,
  },
  txtChoice: {
    textTransform: 'uppercase',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
