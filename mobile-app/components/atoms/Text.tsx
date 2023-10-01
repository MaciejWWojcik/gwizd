import React, { PropsWithChildren, useMemo } from 'react'
import {
  StyleProp,
  TextProps as NativeTextProps,
  TextStyle,
} from 'react-native'
import { AppColor, colors } from '../../styles/colors'
import { FontSize, FontWeight, font, generateFont } from '../../styles/font'
import Animated, { AnimateProps } from 'react-native-reanimated'

export interface TextProps extends AnimateProps<NativeTextProps> {
  color?: AppColor
  weight?: FontWeight
  size?: FontSize
  style?: StyleProp<TextStyle>
  testID?: string
}

export const Text: React.FC<PropsWithChildren<TextProps>> = ({
  children,
  color = 'black',
  weight = 'regular',
  size = 'x400',
  style,
  testID,
  ...rest
}) => {
  const style_ = useMemo(
    () => ({
      ...generateFont(weight, font.size[size]),
      color: colors[color],
    }),
    [color, weight, size]
  )

  return (
    <Animated.Text {...rest} style={[style_, style]} testID={testID}>
      {children}
    </Animated.Text>
  )
}
