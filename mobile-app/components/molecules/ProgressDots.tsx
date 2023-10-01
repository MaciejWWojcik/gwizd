import { memo, useCallback, useMemo } from 'react'
import { LayoutChangeEvent, StyleProp, View, ViewStyle } from 'react-native'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'
import { colors } from '../../styles/colors'
import Animated, {
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import { globalStyle } from '../../styles'

export interface ProgressDotsInterface {
  stepsLength: number
  currentStepIndex: number
}

export const ProgressDots: React.FC<ProgressDotsInterface> = ({
  stepsLength,
  currentStepIndex,
}: ProgressDotsInterface) => {
  if (currentStepIndex >= stepsLength) {
    throw new Error('Current step index cannot exceed total steps length')
  }

  const progressBarWidthTotal = useSharedValue(0)
  const progressBarTranslateX = useSharedValue(0)
  const handleContainerLayout = useCallback(
    ({ nativeEvent }: LayoutChangeEvent) => {
      progressBarWidthTotal.value = nativeEvent.layout.width
    },
    []
  )

  useDerivedValue(() => {
    progressBarTranslateX.value = withTiming(
      -1 *
        (progressBarWidthTotal.value -
          progressBarWidthTotal.value * ((currentStepIndex + 1) / stepsLength))
    )
  })

  const progressBarWidthStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: progressBarTranslateX.value }],
  }))

  const steps = useMemo(() => {
    return new Array(stepsLength)
      .fill(null)
      .map((_, index) => (
        <MemoizedDot active={index <= currentStepIndex} index={index} />
      ))
  }, [stepsLength, currentStepIndex])

  return (
    <View onLayout={handleContainerLayout} style={styles.container}>
      <View style={[styles.bar]} />
      <Animated.View
        style={[styles.bar, styles.barActive, progressBarWidthStyle]}
      />
      <View style={styles.steps}>{steps}</View>
    </View>
  )
}

export interface DotInterface {
  active: boolean
  index: number
}
export const Dot: React.FC<DotInterface> = ({ active, index }) => {
  const opacity = useSharedValue(0.3)
  opacity.value = withTiming((index + 1) * 0.3)

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  return (
    <Animated.View
      style={[
        styles.dot,
        active && {
          backgroundColor: colors.primary,
        },
      ]}
    />
  )
}

const MemoizedDot = memo(Dot)

const styles = ScaledSheet.create({
  container: {
    overflow: 'hidden',
  },
  dot: {
    width: '16@ms',
    height: '16@ms',
    backgroundColor: colors.primary300,
    borderRadius: globalStyle.borderRadius.roundedFull,
  },
  dotHighlighted: {},
  steps: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'space-evenly',
  },
  bar: {
    backgroundColor: colors.primary300,
    width: '100%',
    height: 5,
    position: 'absolute',
    left: 0,
    top: moderateScale(5),
    borderRadius: globalStyle.borderRadius.roundedFull,
  },
  barActive: {
    backgroundColor: colors.primary,
  },
})
