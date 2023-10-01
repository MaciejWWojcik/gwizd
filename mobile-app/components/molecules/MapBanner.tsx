import { Image, ScreenWidth } from '@rneui/base'
import { StyleProp, View, ViewStyle } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'

export interface MapBannerProps {
  containerStyle?: StyleProp<ViewStyle>
}

export const MapBanner: React.FC<MapBannerProps> = ({ containerStyle }) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image
        source={require('../../assets/home/map.png')}
        style={[styles.image, { width: 441, height: 600 }]}
      />
      <View style={styles.animationContainer}></View>
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    width: '100%',
    minWidth: 380,
    minHeight: 268,
  },
  image: {},
  animationContainer: {
    borderRadius: 20,
    width: 390,
    height: 275,
    top: 140,
    left: 25,
    overflow: 'hidden',
    position: 'absolute',
  },
  animal: {
    position: 'absolute',
  },
})
