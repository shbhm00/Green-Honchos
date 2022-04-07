import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './homeScreen';
const Stack = createNativeStackNavigator();

function Router() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Employees Dashboard">
        <Stack.Screen
          name="Employees Dashboard"
          component={HomeScreen}
          // options={{headerShown: false}}
        />
        {/* <Stack.Screen
          // options={{presentation: 'modal'}}
          name="Add / Edit Employee"
          component={EmployEntry}
          // options={{headerShown: false}}
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
