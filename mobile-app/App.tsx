import { StatusBar } from 'expo-status-bar'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { HomeScreen } from './components/screens/HomeScreen'
import { useFonts } from './hooks/useFonts'
import { AppNavigator } from './navigation/AppNavigator'

export default function App() {
  const [fontsLoaded] = useFonts()

  if (!fontsLoaded) {
    return null
  }

  return (
    <SafeAreaProvider>
      <StatusBar translucent backgroundColor='transparent' style='dark' />
      <AppNavigator />
    </SafeAreaProvider>
  )
}
