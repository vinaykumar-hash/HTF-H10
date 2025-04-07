import { View, Text } from 'react-native'
import { Tabs } from 'expo-router';
import React from 'react'

import FontAwesome from '@expo/vector-icons/FontAwesome';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
        headerShown:false
    }}
    >
        <Tabs.Screen name='index'
         options={{
            tabBarLabel:'Home',
            tabBarIcon:({color,size})=>(
                <FontAwesome name="home" size={24} color="color" />
            )
          }} />
        <Tabs.Screen name='profile'
        options={{
            tabBarLabel:'profile',
            tabBarIcon:({color,size})=>(
                <FontAwesome name="user-circle" size={24} color="black" />
            )
          }}/>
        <Tabs.Screen name='AddNew'
        options={{
            tabBarLabel:'AddNew',
            tabBarIcon:({color,size})=>(
                <FontAwesome name="plus-square" size={size} color="color" />
            )
          }}/>
    </Tabs>
  )
}