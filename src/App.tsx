import 'react-native-gesture-handler';

import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';

import Home from 'screens/Home';
import Chat from 'screens/Chat';

import { color } from 'styles';

const WHITE = color.WHITE;
const BLACK = color.BLACK;

type AppNavigationParamList = {
  Home: undefined;
  Chat: { roomID: string };
};
export type AppNavigationProp<T extends keyof AppNavigationParamList = 'Home'> =
  DrawerNavigationProp<AppNavigationParamList, T>;

export type AppRouteProp<T extends keyof AppNavigationParamList = 'Home'> =
  RouteProp<AppNavigationParamList, T>;

type HomeStackPramList = {
  Home: undefined;
  Chat: undefined;
};
const Stack = createStackNavigator<HomeStackPramList>();
const HomeStack = ({}) => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: WHITE,
          height: 75,
        },
        headerTintColor: BLACK,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerLeft: () => (
          <AntDesign
            style={{ marginLeft: 15 }}
            name="menufold"
            size={28}
            color={BLACK}
            onPress={() => navigation.openDrawer()}
          />
        ),
      })}
    >
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
