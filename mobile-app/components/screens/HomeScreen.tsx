import { Text } from '../atoms/Text'
import { ScreenContainer } from '../atoms/ScreenContainer'
import { MapBanner } from '../molecules/MapBanner'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'
import { Linking, TouchableOpacity, View } from 'react-native'
import { LoginButton } from '../atoms/LoginButton'
import { Button } from '../atoms/Button'
import { globalStyle } from '../../styles'
import { PublicRoute } from '../../navigation/routes'
import { useNavigation } from '../../hooks/useNavigation'

export interface HomeProps {}

export const HomeScreen: React.FC<HomeProps> = () => {
  const navigation = useNavigation()

  return (
    <ScreenContainer>
      <View style={styles.loginContainer}>
        <LoginButton
          containerStyle={styles.login}
          onPress={() => {
            console.warn('TODO')
          }}
        />
      </View>

      <View style={styles.header}>
        <Text size='x1000' weight='black'>
          {'Widzisz?'}
        </Text>

        <Text size='x1000' weight='black'>
          {'Reaguj!'}
        </Text>
      </View>

      <MapBanner containerStyle={styles.map} />

      <View style={styles.footer}>
        <View style={styles.buttonsContainer}>
          <Button
            title={'Znalazłem zwierzę'}
            onPress={() => navigation.navigate(PublicRoute.REPORT_ANIMAL)}
          />

          <Button
            variant='primary-outlined'
            containerStyle={styles.buttonLost}
            title='Zgubiłem zwierzę'
            onPress={() => console.warn('TODO')}
          />
        </View>

        <TouchableOpacity onPress={() => Linking.openURL('tel:505702441')}>
          <Text style={styles.callContainer}>
            {'Lub zadzwoń do nas '}
            <Text style={styles.callContainer} weight='bold'>
              {'50 570 2441'}
            </Text>
          </Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  )
}

const styles = ScaledSheet.create({
  loginContainer: {
    marginTop: '20@ms',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  login: {},
  map: {
    ...globalStyle.container.omitScreenPadding,
    top: -100,
    zIndex: 0,
  },
  header: {
    zIndex: 1,
    marginLeft: '20@ms',
  },
  footer: {
    justifyContent: 'flex-end',
    rowGap: moderateScale(24),
  },
  buttonsContainer: {
    rowGap: moderateScale(12),
  },
  buttonLost: {},
  callContainer: {
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },
})
