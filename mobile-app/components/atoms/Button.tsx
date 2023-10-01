import { useMemo } from 'react'
import { StyleProp, ViewStyle } from 'react-native'
import { ScaledSheet, moderateVerticalScale } from 'react-native-size-matters'
import { FontSize, FontWeight, font, generateFont } from '../../styles/font'
import { AppColor, colors } from '../../styles/colors'
import { defaultHitSlop, globalStyle } from '../../styles'

import { Button as NativeButton } from '@rneui/base'

export type ButtonVariant =
  | 'primary-filled'
  | 'primary-outlined'
  | 'text'
  | 'primary-outlined-white'

export type ButtonSize = '400'

interface ButtonSizeProperties {
  minHeight: number
  fontSize: FontSize
  fontWeight: FontWeight
}

interface ButtonVariantProperties {
  loadingIndicatorColor: AppColor
  fontColor: AppColor
  backgroundColor: AppColor
  borderColor?: AppColor
}

const buttonVariants: Record<ButtonVariant, ButtonVariantProperties> = {
  'primary-filled': {
    loadingIndicatorColor: 'primary',
    fontColor: 'white',
    backgroundColor: 'primary',
  },
  text: {
    loadingIndicatorColor: 'black',
    fontColor: 'black',
    backgroundColor: 'transparent',
  },
  'primary-outlined': {
    loadingIndicatorColor: 'black',
    fontColor: 'black',
    backgroundColor: 'transparent',
    borderColor: 'grey400',
  },
  'primary-outlined-white': {
    loadingIndicatorColor: 'white',
    fontColor: 'white',
    backgroundColor: 'transparent',
    borderColor: 'white',
  },
}

const sizingVariants: Record<ButtonSize, ButtonSizeProperties> = {
  '400': {
    minHeight: moderateVerticalScale(46),
    fontSize: 'x400',
    fontWeight: 'medium',
  },
}

export interface ButtonProps {
  title: string
  onPress: () => void
  variant?: ButtonVariant
  size?: ButtonSize
  loading?: boolean
  disabled?: boolean
  containerStyle?: StyleProp<ViewStyle>
  buttonStyle?: StyleProp<ViewStyle>
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary-filled',
  size = '400',
  loading,
  disabled,
  containerStyle,
  buttonStyle,
}) => {
  const sizingProperties = sizingVariants[size]
  const variantProperties = buttonVariants[variant]

  const styles = useMemo(
    () => buildStyle(variantProperties, sizingProperties),
    [variantProperties, sizingProperties]
  )

  const loadingProps = {
    color: colors[variantProperties.loadingIndicatorColor],
  }

  return (
    <NativeButton
      buttonStyle={[
        styles.button,
        buttonStyle,
        variant === 'text' && {
          minHeight: undefined,
          paddingVertical: undefined,
          marginTop: 1,
        },
      ]}
      containerStyle={[
        styles.container,
        containerStyle,
        variant === 'text' && {},
      ]}
      title={title}
      onPress={onPress}
      disabled={disabled}
      hitSlop={defaultHitSlop}
      disabledStyle={styles.disabled}
      disabledTitleStyle={styles.title}
      loading={loading}
      loadingProps={loadingProps}
      titleStyle={styles.title}
    />
  )
}

const buildStyle = (
  { backgroundColor, fontColor, borderColor }: ButtonVariantProperties,
  { minHeight, fontSize, fontWeight }: ButtonSizeProperties
) =>
  ScaledSheet.create({
    button: {
      minHeight,
      backgroundColor: colors[backgroundColor],
      paddingVertical: 3,
    },
    container: {
      width: '100%',
      maxHeight: minHeight,
      overflow: 'hidden',
      borderRadius: globalStyle.borderRadius.roundedFull,
      borderWidth: borderColor ? 2 : undefined,
      borderColor: borderColor && colors[borderColor],
    },
    title: {
      color: colors[fontColor],
      ...generateFont(fontWeight, font.size[fontSize]),
    },
    disabled: {
      opacity: 0.3,
    },
  })
