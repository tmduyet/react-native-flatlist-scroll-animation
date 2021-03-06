import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar, TouchableOpacity} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {TOPNAVI_H, BANNER_H} from './ImageHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const TopNavigation = props => {
  const safeArea = useSafeArea();

  const {title, scrollA, navigation,onPress} = props;
  const isFloating = !!scrollA;
  const [isTransparent, setTransparent] = useState(isFloating);

  useEffect(() => {
    if (!scrollA) {
      return;
    }
    const listenerId = scrollA.addListener(a => {
      const topNaviOffset = BANNER_H - TOPNAVI_H - safeArea.top;
      isTransparent !== a.value <= topNaviOffset &&
        setTransparent(!isTransparent);
    });
    return () => scrollA.removeListener(listenerId);
  });

  return (
    <>
      <StatusBar
        barStyle={isTransparent ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.container(safeArea, isFloating, isTransparent)}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
            onPress()
          }}
          style={{
            position: 'absolute',
            left: 10,
            bottom: 10,
            width: 35,
            height: 35,
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 100,
          }}>
          <FontAwesome
            color={isTransparent ? '#fff' : '#000'}
            name={'chevron-left'}
            size={25}></FontAwesome>
        </TouchableOpacity>
        <Text style={styles.title(isTransparent)}>{title}</Text>
      </View>
    </>
  );
};

const styles = {
  container: (safeArea, isFloating, isTransparent) => ({
    paddingTop: safeArea.top,
    marginBottom: isFloating ? -TOPNAVI_H - safeArea.top : 0,
    height: TOPNAVI_H + safeArea.top,
    justifyContent: 'center',
    shadowOffset: {y: 0},
    backgroundColor: isTransparent ? '#0001' : '#FFF',
    shadowOpacity: isTransparent ? 0 : 0.5,
    elevation: isTransparent ? 0.01 : 5,
    zIndex: 100,
  }),
  title: isTransparent => ({
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: isTransparent ? '#FFF' : '#000',
  }),
};

export default TopNavigation;
