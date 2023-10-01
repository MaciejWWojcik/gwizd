import React, { PropsWithChildren, useMemo } from 'react'
import { ScrollView, StyleProp, View, ViewStyle } from 'react-native'
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'
import { colors } from '../../styles/colors'
import {
  KeyboardAwareScrollView,
  KeyboardAwareScrollViewProps,
} from 'react-native-keyboard-aware-scroll-view'
import { globalStyle } from '../../styles'

type ContainerVariant =
  | 'default'
  | 'fullscreen'
  | 'scrollable'
  | 'scrollable-fullscreen'

interface Props {
  containerStyle?: StyleProp<ViewStyle>
  keyboardAwareScroll?: boolean
  paddingHorizontal?: boolean
  scrollViewProps?: KeyboardAwareScrollViewProps
  variant?: ContainerVariant
  testID?: string
  disableBottomPadding?: boolean
}

/**
 * Universal container for app screen
 *
 * @param variant
 * * `default` View with SafeAreaView margins on the top and bottom
 * * `fullscreen` View that covers whole screen, no SafeAreaView margins
 * * `scrollable` View that can be scrolled with SafeAreaView margins
 * * `scrollable-fullscreen` View that can be scrolled and covers whole screen
 */
export const ScreenContainer = React.forwardRef<View, PropsWithChildren<Props>>(
  (
    {
      children,
      containerStyle,
      keyboardAwareScroll = false,
      paddingHorizontal = true,
      scrollViewProps,
      variant = 'default',
      testID,
      disableBottomPadding = false,
    },
    ref
  ) => {
    const insets = useSafeAreaInsets()

    const styles = useMemo(
      () => buildStyles(insets, paddingHorizontal),
      [insets, paddingHorizontal]
    )

    const containerStyle_ = useMemo(
      () => [
        styles.container,
        !['fullscreen', 'scrollable-fullscreen'].includes(variant) &&
          styles.safeAreaContainer,
        !['scrollable', 'scrollable-fullscreen'].includes(variant) &&
          styles.paddingHorizontal,
        disableBottomPadding && styles.removePaddingBottom,
        containerStyle,
      ],
      [
        styles.container,
        styles.safeAreaContainer,
        styles.paddingHorizontal,
        styles.removePaddingBottom,
        variant,
        disableBottomPadding,
        containerStyle,
      ]
    )

    const scrollViewProps_ = useMemo(
      () => ({
        showsVerticalScrollIndicator: false,
        contentContainerStyle: [styles.paddingHorizontal, styles.scrollContent],
        ...scrollViewProps,
      }),
      [scrollViewProps, styles.paddingHorizontal, styles.scrollContent]
    )

    const getContent = () => {
      if (!['scrollable', 'scrollable-fullscreen'].includes(variant)) {
        return children
      }

      if (keyboardAwareScroll) {
        return (
          <KeyboardAwareScrollView
            testID='screen-container-scroll-view'
            {...scrollViewProps_}
          >
            {children}
          </KeyboardAwareScrollView>
        )
      }

      return (
        <ScrollView testID='screen-container-scroll-view' {...scrollViewProps_}>
          {children}
        </ScrollView>
      )
    }

    return (
      <View ref={ref} style={containerStyle_} testID={testID}>
        {getContent()}
      </View>
    )
  }
)

const buildStyles = (
  { bottom, left, right, top }: EdgeInsets,
  paddingHorizontal: boolean
) =>
  ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.backgroundPrimary,
    },
    safeAreaContainer: {
      paddingTop: top,
      paddingBottom: bottom,
      paddingLeft: left,
      paddingRight: right,
    },
    paddingHorizontal: {
      paddingLeft: paddingHorizontal ? globalStyle.container.padding : 0,
      paddingRight: paddingHorizontal ? globalStyle.container.padding : 0,
    },
    removePaddingBottom: {
      paddingBottom: 0,
    },
    scrollContent: {
      minHeight: '100%',
    },
  })
