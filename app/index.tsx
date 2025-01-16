import { Text, View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import BoyScreen from './BoyScreen';
import GirlScreen from './GirlScreen';
import { TabActions } from '@react-navigation/native';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const Tab = createBottomTabNavigator()
export default function Index() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Gấu Cái"
        options={{tabBarIcon: () => <Text>👧🏻</Text>}} 
        component={GirlScreen}/>
      <Tab.Screen 
        name="Gấu Đực"
        options={{tabBarIcon: () => <Text>👦🏻</Text>}} 
        component={BoyScreen}/>
    </Tab.Navigator>
  );
}
