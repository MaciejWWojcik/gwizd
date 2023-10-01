import { useCallback, useMemo, useState } from 'react'

export interface UseSequentialNavigationProps {
  totalSteps: number
  initialStep?: number
  onSubmit: () => void
}

export const useSequentialNavigation = ({
  totalSteps,
  initialStep = 0,
  onSubmit,
}: UseSequentialNavigationProps) => {
  const [currentStep, setCurrentStep] = useState(initialStep)

  const isLastStep = useMemo(
    () => currentStep === totalSteps - 1,
    [totalSteps, currentStep]
  )

  const goBack = () => {
    setCurrentStep((steps) => Math.max(steps - 1, 0))
  }

  const goForward = useCallback(() => {
    if (isLastStep) {
      onSubmit()
      return
    }

    setCurrentStep((steps) => (steps + 1) % totalSteps)
  }, [isLastStep])

  return {
    currentStep,
    isLastStep,
    goBack,
    goForward,
  }
}
