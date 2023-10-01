import { Image } from '@rneui/base'
import {
  ImageSourcePropType,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import { Text } from '../atoms/Text'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'
import { ColorSpace } from 'react-native-reanimated'
import { colors } from '../../styles/colors'
import { globalStyle } from '../../styles'

export interface ImageButtonProps {
  source: ImageSourcePropType
  label: string
  highlighted?: boolean
  onPress: () => void
  containerStyle?: StyleProp<ViewStyle>
}

export const ImageButton: React.FC<ImageButtonProps> = ({
  source,
  label,
  highlighted = false,
  containerStyle,
  onPress,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.container,
        highlighted && styles.containerHighlighted,
        containerStyle,
      ]}
    >
      <Image
        source={source}
        style={{
          height: moderateScale(50),
          width: moderateScale(50),
          objectFit: 'contain',
        }}
      />
      <Text style={styles.text} size='x400' weight='medium'>
        {label}
      </Text>
    </TouchableOpacity>
  )
}

const styles = ScaledSheet.create({
  container: {
    height: '178@ms',
    width: '119@ms',
    justifyContent: 'flex-end',
    borderWidth: 2,
    borderColor: colors.grey400,
    borderRadius: globalStyle.borderRadius.rounded400,
    padding: moderateScale(10),
    alignItems: 'center',
  },
  containerHighlighted: {
    borderColor: colors.primary,
  },
  text: {
    marginTop: '30@ms',
  },
})
