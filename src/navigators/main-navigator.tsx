import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {SqliteDemo} from '../screens/sqlite/sqlite-demo';
import {Home} from '../screens';
import {HomeRoutes} from '../utils/types';
import {WatermelonDemo} from '../screens/watermelon/watermelon-demo';

const Stack = createStackNavigator();

export const MainNavigator = () => (
  <Stack.Navigator initialRouteName="Home">
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name={HomeRoutes.SQLITE} component={SqliteDemo} />
    <Stack.Screen name={HomeRoutes.WATERMELON} component={WatermelonDemo} />
  </Stack.Navigator>
);
