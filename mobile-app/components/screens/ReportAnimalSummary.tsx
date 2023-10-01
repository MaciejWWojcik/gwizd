import { StackScreenProps } from '@react-navigation/stack'
import { ScreenContainer } from '../atoms/ScreenContainer'
import { RootStackParamList } from '../../navigation/AppNavigator'
import { PublicRoute } from '../../navigation/routes'
import { Text } from '../atoms/Text'
import { useAnimalCategoryInfo } from '../../hooks/api/useAnimalCategoryInfo'
import { Button } from '../atoms/Button'
import { useNavigation } from '../../hooks/useNavigation'
import { moderateScale } from 'react-native-size-matters'
import { View } from 'react-native'
import { colors } from '../../styles/colors'
import { ScreenWidth } from '@rneui/base'

interface ReportAnimalSummaryProps
  extends StackScreenProps<RootStackParamList, PublicRoute.REPORT_SUMMARY> {}

export const ReportAnimalSummaryScreen = ({
  route,
}: ReportAnimalSummaryProps) => {
  const navigation = useNavigation()
  const { category } = route.params
  const [data, isLoading, error, refetch] = useAnimalCategoryInfo({ category })

  return (
    <ScreenContainer paddingHorizontal={false} variant='fullscreen'>
      <View
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {error && (
          <>
            <Text>{`Error ${error}`}</Text>
            <Button title='Spróbuj ponownie' onPress={refetch} />
          </>
        )}
        {isLoading && <Text>{`Ładowanie...`}</Text>}
      </View>
      {!isLoading && data && (
        <>
          {data.isDangerous ? (
            <View
              style={{
                backgroundColor: colors.orange400,
                width: '100%',
                height: '100%',
                flex: 1,
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                size='x1000'
                weight='black'
                color='white'
                style={{
                  textAlign: 'center',
                }}
              >
                {'Uwaga!'}
              </Text>
              <Text
                size='x700'
                style={{ marginTop: moderateScale(50), textAlign: 'center' }}
                color='white'
              >
                {
                  'Zwierzę, które zgłosiłeś może stanowić zagrożenie dla Twojego życia lub zdrowia. Zachowaj ostrożność i nie podchodź do zwierzęcia.'
                }
              </Text>
              <Button
                containerStyle={{
                  position: 'absolute',
                  bottom: 40,
                  left: 20,
                  right: 20,
                  width: ScreenWidth - 40,
                }}
                title='Rozumiem'
                onPress={() => navigation.navigate(PublicRoute.MAP_SCREEN)}
                variant='primary-outlined-white'
              />
            </View>
          ) : (
            <View
              style={{
                backgroundColor: colors.primary,
                width: '100%',
                height: '100%',
                flex: 1,
                flexGrow: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text
                size='x1000'
                weight='black'
                color='white'
                style={{
                  textAlign: 'center',
                }}
              >
                {'Dziękujemy za zgłoszenie!'}
              </Text>
              <Text
                size='x700'
                style={{ marginTop: moderateScale(50), textAlign: 'center' }}
                color='white'
              >
                {'Dzięki Tobie, zwierzęta i ludzie są bezpieczniejsi.'}
              </Text>
              <Button
                containerStyle={{
                  position: 'absolute',
                  bottom: 40,
                  left: 20,
                  right: 20,
                  width: ScreenWidth - 40,
                }}
                title='Rozumiem'
                onPress={() => navigation.navigate(PublicRoute.MAP_SCREEN)}
                variant='primary-outlined-white'
              />
            </View>
          )}
        </>
      )}
    </ScreenContainer>
  )
}
