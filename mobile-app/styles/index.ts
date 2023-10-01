import { ScreenWidth } from '@rneui/base'
import { Insets } from 'react-native'

export const globalStyle = {
  container: {
    padding: 20,
    /** Padding for elements that are visible next to the rounded element (eg. button),
     * and need to be shifted inwards horizontally to create a visual equality.
     */
    roundedNegativePadding: 2,
    get omitScreenPadding() {
      return {
        width: ScreenWidth,
        marginLeft: -this.padding,
      }
    },
  },
  borderRadius: {
    roundedNone: 0,
    rounded150: 2,
    rounded175: 3,
    rounded200: 4,
    rounded225: 5,
    rounded300: 8,
    rounded400: 12,
    rounded500: 16,
    rounded550: 18,
    rounded600: 20,
    rounded700: 24,
    rounded725: 25,
    rounded850: 30,
    roundedFull: 1000,
  },
}

export const defaultHitSlop: Insets = {
  top: 15,
  bottom: 15,
  left: 15,
  right: 15,
}
