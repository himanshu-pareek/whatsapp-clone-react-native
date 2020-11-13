import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ChatsScreen from '../screens/ChatsScreen';
import TabOneScreen from '../screens/TabOneScreen';
import { MainTabParamList, TabOneParamList, TabTwoParamList, ChatsParamList } from '../types';

import { FontAwesome } from '@expo/vector-icons';

const MainTab = createMaterialTopTabNavigator<MainTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <MainTab.Navigator
      initialRouteName="Chats"
      tabBarOptions={{ 
        activeTintColor: Colors[colorScheme].background,
        style: {
          backgroundColor: Colors[colorScheme].tint,
        },
        indicatorStyle: {
          backgroundColor: Colors[colorScheme].background,
          height: 3,
        },
        labelStyle: {
          fontWeight: 'bold',
        },
        showIcon: true,
       }}
    >
      <MainTab.Screen
        name="Camera"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <FontAwesome name="camera" size={20} color={color} />,
          tabBarLabel: () => null,
        }}
      />
      <MainTab.Screen
        name="Chats"
        component={ChatsNavigator}
      />
      <MainTab.Screen
        name="Status"
        component={TabOneNavigator}
      />
      <MainTab.Screen
        name="Calls"
        component={TabOneNavigator}
      />
    </MainTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={{ headerTitle: 'Tab One Title' }}
      />
    </TabOneStack.Navigator>
  );
}

const ChatsStack = createStackNavigator<ChatsParamList>();

function ChatsNavigator() {
  return(
    <ChatsStack.Navigator>
      <ChatsStack.Screen
        name="ChatsScreen"
        component={ChatsScreen}
        options={{ header: () => null }}
      />
    </ChatsStack.Navigator>
  );
}

// const TabTwoStack = createStackNavigator<TabTwoParamList>();

// function TabTwoNavigator() {
//   return (
//     <TabTwoStack.Navigator>
//       <TabTwoStack.Screen
//         name="TabTwoScreen"
//         component={TabTwoScreen}
//         options={{ headerTitle: 'Tab Two Title' }}
//       />
//     </TabTwoStack.Navigator>
//   );
// }
