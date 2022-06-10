import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

const BG_IMAGE =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT48kqoBMIL-R6ZwD-LAbx7pHgYqXkVtajWwylljeKlYEymJ6OAQYBPWf6Euo_11iBfXUY&usqp=CAU';
const SPACING = 20;
const AVATAR_SIZE = 70;
export  const Item_size = AVATAR_SIZE + SPACING *3;
function Item(props) {
  const {item, index} = props;
  return (
    <View
      style={{
        flexDirection: 'row',
        padding: SPACING,

        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.7)',
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
        <Text style={{fontSize: 22, fontWeight: '700'}}>{item.name}</Text>
        <Text style={{fontSize: 14, opacity: 0.7}}>{item.jobTitle}</Text>
        <Text style={{fontSize: 14, opacity: 0.7, color: '#0099cc'}}>
          {item.email}
        </Text>
      </View>
    </View>
  );
}
export default React.memo(Item);
const styles = StyleSheet.create({});
