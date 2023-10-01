import { View } from 'react-native'
import { Text } from '../atoms/Text'
import { useNavigation } from '../../hooks/useNavigation'
import { ScreenContainer } from '../atoms/ScreenContainer'
import { Button } from '../atoms/Button'
import { PublicRoute } from '../../navigation/routes'

export const MapScreen = () => {
  const navigation = useNavigation()

  return (
    <ScreenContainer>
      <Text>{'Map'}</Text>
      <Button
        title='Go back to home'
        onPress={() => navigation.navigate(PublicRoute.HOME)}
      />
    </ScreenContainer>
  )
}
