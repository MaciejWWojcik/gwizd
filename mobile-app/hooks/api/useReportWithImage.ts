import { useCallback, useEffect, useState } from 'react'
import { API_URL } from '../../constants'

export interface AnimalInfo {}

export interface UseReportWithImage {
  base64: string
}

export const useReportWithImage = ({ base64 }: UseReportWithImage) => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>()
  const [data, setData] = useState<AnimalInfo>()

  const post = useCallback(async () => {
    try {
      setIsLoading(true)

      const response = await fetch(`${API_URL}/image`, {
        method: 'post',
        body: JSON.stringify({
          image: base64,
          position: {
            x: 50.0618585,
            y: 19.9860851,
          },
        }),
      })
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

  return [post, data, isLoading, error] as const
}
