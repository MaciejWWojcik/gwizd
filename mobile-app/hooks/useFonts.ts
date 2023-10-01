import {
  useFonts as useFontsExpo,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from '@expo-google-fonts/roboto'

export const useFonts = () => {
  return useFontsExpo({
    Roboto_900Black,
    Roboto_700Bold,
    Roboto_500Medium,
    Roboto_400Regular,
    Roboto_300Light,
  })
}
