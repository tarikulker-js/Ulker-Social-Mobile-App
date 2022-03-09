import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export default function ActivityScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hello World! Here is Activity Screen</Text>
      <Text>Çok Yakında Aktiviteler!</Text>
      
    </View>
  );
}