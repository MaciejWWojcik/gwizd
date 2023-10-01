import { View } from 'react-native'
import { Text } from '../atoms/Text'
import { PropsWithChildren } from 'react'
import { Button } from '../atoms/Button'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'

export interface ReportStepWithTitleProps {
  title: string
  canGoBack?: boolean
  canGoForward?: boolean
  nextButtonLabel?: string
  onGoForwardPress: () => void
  onGoBackPress: () => void
}

export const ReportStepWithTitle: React.FC<
  PropsWithChildren<ReportStepWithTitleProps>
> = ({
  title,
  children,
  canGoBack,
  canGoForward,
  nextButtonLabel = 'Dalej',
  onGoForwardPress,
  onGoBackPress,
}) => {
  return (
    <View style={{ flex: 1, marginTop: moderateScale(32) }}>
      <View style={styles.bodyContainer}>
        <Text weight='black' size='x700'>
          {title}
        </Text>

        <View style={styles.contentContainer}>{children}</View>
      </View>

      <View style={styles.buttonsContainer}>
        <Button
          disabled={!canGoBack}
          variant='primary-outlined'
          containerStyle={styles.singleButtonContainer}
          title={'Wstecz'}
          onPress={onGoBackPress}
        />
        <Button
          disabled={!canGoForward}
          containerStyle={styles.singleButtonContainer}
          title={nextButtonLabel}
          onPress={onGoForwardPress}
        />
      </View>
    </View>
  )
}

const styles = ScaledSheet.create({
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  contentContainer: {
    flex: 1,
    marginTop: moderateScale(60),
    flexGrow: 1,
    flexShrink: 1,
  },

  singleButtonContainer: {
    maxWidth: '45%',
  },
})
