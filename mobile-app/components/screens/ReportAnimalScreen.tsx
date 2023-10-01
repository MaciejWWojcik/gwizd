import { TouchableOpacity, View } from 'react-native'
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps'
import { ScreenContainer } from '../atoms/ScreenContainer'
import { Text } from '../atoms/Text'
import { colors } from '../../styles/colors'
import { globalStyle } from '../../styles/index'
import { ReportStepWithTitle } from '../molecules/ReportStepWithTItle'
import { useSequentialNavigation } from '../../hooks/useSequentialNavigation'
import { useMemo, useState } from 'react'
import { ImageButtonSelector } from '../molecules/ImageButtonSelector'
import { ProgressDots } from '../molecules/ProgressDots'
import { useNavigation } from '../../hooks/useNavigation'
import { PublicRoute } from '../../navigation/routes'
import { Image } from '@rneui/base'
import { moderateScale } from 'react-native-size-matters'
import { ImageButton } from '../atoms/ImageButton'
import { AppCamera } from '../organisms/AppCamera'
import { useReportWithImage } from '../../hooks/api/useReportWithImage'

export interface ReportAnimalScreen {}

const animalKindList = [
  {
    source: require('../../assets/kind/wild.png'),
    label: 'Dzikie',
  },
  {
    source: require('../../assets/kind/domestic.png'),
    label: 'Domowe',
  },
  {
    source: require('../../assets/kind/exotic.png'),
    label: 'Egzotyczne',
  },
]

const animalSpeciesList = [
  [
    {
      source: require('../../assets/species/boar.png'),
      label: 'Dzik',
    },
    {
      source: require('../../assets/species/fox.png'),
      label: 'Lis',
    },
    {
      source: require('../../assets/species/eagle.png'),
      label: 'Orzeł',
    },
    {
      source: require('../../assets/species/bat.png'),
      label: 'Nietoperz',
    },
    {
      source: require('../../assets/species/deer.png'),
      label: 'Jeleń',
    },
    {
      source: require('../../assets/species/goose.png'),
      label: 'Gęś',
    },
    {
      source: require('../../assets/species/duck.png'),
      label: 'Kaczka',
    },
    {
      source: require('../../assets/species/wolf.png'),
      label: 'Wilk',
    },
    {
      source: require('../../assets/species/owl.png'),
      label: 'Sowa',
    },
  ],
  [
    {
      source: require('../../assets/kind/wild.png'),
      label: 'Dzik',
    },
  ],
  [
    {
      source: require('../../assets/kind/wild.png'),
      label: 'Dzik',
    },
  ],
]

export const ReportAnimalScreen: React.FC<ReportAnimalScreen> = ({}) => {
  const [kind, setKind] = useState<number | undefined>()
  const [species, setSpiecies] = useState<number | undefined>()
  const navigation = useNavigation()
  const [launchCamera, setLaunchCamera] = useState(false)
  const [base64Image, setBase64Image] = useState<string>()
  const [imageUri, setImageUri] = useState<string>()

  const [post] = useReportWithImage({ base64: base64Image ?? '' })

  const { currentStep, isLastStep, goBack, goForward } =
    useSequentialNavigation({
      totalSteps: 3,
      onSubmit: () => {
        post()
        navigation.navigate(PublicRoute.REPORT_SUMMARY, {
          category: animalSpeciesList[kind!][species!].label,
        })
      },
    })

  if (launchCamera) {
    return (
      <AppCamera
        onBase64={(base64, uri) => {
          setBase64Image(base64)
          setLaunchCamera(false)
          setImageUri(uri)
        }}
      />
    )
  }

  return (
    <ScreenContainer>
      <View
        style={{
          flex: 1,
        }}
      >
        <ProgressDots stepsLength={3} currentStepIndex={currentStep} />
        <ReportStepWithTitle
          onGoBackPress={goBack}
          onGoForwardPress={goForward}
          title={
            [
              'Jaki rodzaj zwierzęcia zgłaszasz?',
              'Zidentyfikuj gatunek',
              'Czy chcesz podać dodatkowe informacje?',
            ][currentStep]
          }
          canGoBack={currentStep > 0}
          canGoForward={[
            () => kind !== undefined,
            () => species !== undefined,
            () => true,
          ][currentStep]()}
          nextButtonLabel={isLastStep ? 'Zgłoś' : undefined}
        >
          {
            [
              <ImageButtonSelector
                internalKey={'select-animal-kind'}
                items={animalKindList}
                selectedIndex={kind}
                onSelect={(index) => {
                  setKind(index)
                  setSpiecies(undefined)
                }}
              />,
              <ImageButtonSelector
                internalKey={'select-animal-spiecies'}
                items={animalSpeciesList[kind!]}
                selectedIndex={species}
                onSelect={(index) => setSpiecies(index)}
              />,
              <View>
                <ImageButton
                  onPress={() => {
                    setLaunchCamera(true)
                  }}
                  label={'Add photo'}
                  source={
                    imageUri
                      ? {
                          uri: imageUri,
                        }
                      : require('../../assets/camera.png')
                  }
                />
                <TouchableOpacity>
                  <View
                    style={{
                      width: 100,
                      height: 100,
                      borderRadius: globalStyle.borderRadius.rounded400,
                    }}
                  ></View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('TODO')}>
                  <Image
                    source={require('../../assets/sec-bbtn.png')}
                    style={{
                      height: moderateScale(57),
                      width: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </TouchableOpacity>
              </View>,
            ][currentStep]
          }
        </ReportStepWithTitle>
      </View>
    </ScreenContainer>
  )
}
