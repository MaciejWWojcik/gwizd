import { useCallback, useEffect, useState } from 'react'
import { API_URL } from '../../constants'

export interface AnimalInfo {
  isDangerous: boolean
}

export interface UseAnimalCategoryInfoProps {
  category: string
}

export const useAnimalCategoryInfo = ({
  category,
}: UseAnimalCategoryInfoProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [data, setData] = useState<AnimalInfo>()

  const refetch = useCallback(async () => {
    try {
      setIsLoading(true)

      const response = await fetch(
        `${API_URL}/image/isDangerous?specie=${category}`
      )
      const data = await response.json()

      if (!response.ok) {
        throw new Error(`[${response.status}] ${response.statusText}`)
      }

      setData({ isDangerous: data })
    } catch (e) {
      setError((e as Error).message)
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    refetch()
  }, [refetch])

  return [data, isLoading, error, refetch] as const
}
