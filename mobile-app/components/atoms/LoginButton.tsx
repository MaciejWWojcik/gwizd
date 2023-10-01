import { Image } from '@rneui/base'
import { StyleProp, TouchableOpacity, ViewStyle } from 'react-native'

export interface LoginButtonProps {
  onPress: () => void
  containerStyle?: StyleProp<ViewStyle>
}

export const LoginButton: React.FC<LoginButtonProps> = ({
  onPress,
  containerStyle,
}) => {
  return (
    <TouchableOpacity style={containerStyle} onPress={onPress}>
      <Image
        source={require('../../assets/login.png')}
        style={[{ width: 48, height: 48 }]}
      />
    </TouchableOpacity>
  )
}
