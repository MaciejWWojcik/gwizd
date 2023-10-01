import { moderateScale } from 'react-native-size-matters'

export type FontWeight = keyof typeof font.weight
export type FontSize = keyof typeof font.size

export const generateFont = (
  weight: FontWeight = 'regular',
  size: number = font.size.x400
) => ({
  fontFamily: font.weight[weight],
  fontSize: size,
})

export const font = {
  weight: {
    black: 'Roboto_900Black',
    bold: 'Roboto_700Bold',
    medium: 'Roboto_500Medium',
    regular: 'Roboto_400Regular',
    light: 'Roboto_300Light',
  },

  size: {
    x1000: moderateScale(40),
    x700: moderateScale(24),
    x650: moderateScale(20),
    x600: moderateScale(18),
    x500: moderateScale(16),
    x400: moderateScale(14),
    x100: moderateScale(12),
  },
} as const
