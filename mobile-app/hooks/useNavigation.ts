import {
  NavigationProp,
  useNavigation as useNativeNavigation,
} from '@react-navigation/native'

export const useNavigation = () => {
  const navigation = useNativeNavigation<NavigationProp<any>>()

  const getState = () => navigation.getState()

  const getNavigation = () => navigation

  return {
    navigate: navigation.navigate,
    goBack: navigation.goBack,
    getState,
    getNavigation,
  }
}
