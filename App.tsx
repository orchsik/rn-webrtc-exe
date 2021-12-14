import 'react-native-gesture-handler';

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from 'screens/Home';
import Chat from 'screens/Chat';

type HomeStackPramList = {
  Home: undefined;
  Chat: undefined;
};
const Stack = createStackNavigator<HomeStackPramList>();
const HomeStack = ({}) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

const Drawer = createDrawerNavigator();
const App = ({}) => {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="Home" component={HomeStack} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
