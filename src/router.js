import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PlpScreen from './screens/plpScreen';
import PdpScreen from './screens/pdpScreen';
const Stack = createNativeStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="PLP">
        <Stack.Screen
          name="PLP"
          component={PlpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          // options={{presentation: 'modal'}}
          name="PDP"
          component={PdpScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
