import { FlatList, ImageSourcePropType, View } from 'react-native'
import { ScaledSheet, moderateScale } from 'react-native-size-matters'
import { ImageButton } from '../atoms/ImageButton'
import { ScreenWidth } from '@rneui/base'

export type Item = {
  source: ImageSourcePropType
  label: string
}

export interface ImageButtonSelectorProps {
  items: Item[]
  selectedIndex?: number
  onSelect: (index: number) => void
  internalKey: string
}

export const ImageButtonSelector: React.FC<ImageButtonSelectorProps> = ({
  items,
  selectedIndex,
  internalKey,
  onSelect,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => `${internalKey}__image-button--${item.label}`}
        renderItem={({ item, index }) => (
          <ImageButton
            containerStyle={[
              { maxWidth: ScreenWidth / 3.5, marginTop: moderateScale(10) },
              index % 3 > 0 && { marginLeft: moderateScale(10) },
            ]}
            onPress={() => onSelect(index)}
            label={item.label}
            source={item.source}
            highlighted={selectedIndex === index}
          />
        )}
        numColumns={3}
      />
    </View>
  )
}

const styles = ScaledSheet.create({
  container: {
    rowGap: moderateScale(10),
    columnGap: moderateScale(10),
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
