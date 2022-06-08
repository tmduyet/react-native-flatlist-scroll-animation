import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

import ImageHeader from '../ImageHeader/ImageHeader';
import SharedList from './SharedList';

const Stack = createSharedElementStackNavigator();

export default SharedElementTrans = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="List" component={SharedList} />
        <Stack.Screen
          name="Detail"
          component={ImageHeader}
          sharedElements={(route, otherRoute, showing) => {
            const {item} = route.params;
            return [`item.${item.id}.photo`];
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
