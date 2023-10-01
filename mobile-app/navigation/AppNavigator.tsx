import { NavigationContainer } from '@react-navigation/native'
import { PublicRoute } from './routes'
import { HomeScreen } from '../components/screens/HomeScreen'
import { createStackNavigator } from '@react-navigation/stack'
import { ReportAnimalScreen } from '../components/screens/ReportAnimalScreen'
import { ReportAnimalSummaryScreen } from '../components/screens/ReportAnimalSummary'
import { MapScreen } from '../components/screens/MapScreen'

export type RootStackParamList = {
  [PublicRoute.HOME]: undefined
  [PublicRoute.REPORT_ANIMAL]: undefined
  [PublicRoute.REPORT_SUMMARY]: { category: string }
  [PublicRoute.MAP_SCREEN]: undefined
}

const Stack = createStackNavigator()

export const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen component={HomeScreen} name={PublicRoute.HOME} />
        <Stack.Screen
          component={ReportAnimalScreen}
          name={PublicRoute.REPORT_ANIMAL}
        />
        <Stack.Screen
          component={ReportAnimalSummaryScreen}
          name={PublicRoute.REPORT_SUMMARY}
        />
        <Stack.Screen component={MapScreen} name={PublicRoute.MAP_SCREEN} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
