import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'
import { useGeolocation } from '../useGeolocation'

const a_latitude = 41.6488
const a_longitude = -0.8891

describe('useGeolocation', () => {
  let getPosition

  beforeEach(() => {
    getPosition = useGeolocation().getPosition
    vi.stubGlobal('navigator', {
      geolocation: {
        getCurrentPosition: vi.fn()
      }
    })
  })

  describe('when is ok', () => {
    it('retrieve current position', async () => {
      navigator.geolocation.getCurrentPosition.mockImplementation((success) => {
        success({ coords: { latitude: a_latitude, longitude: a_longitude } })
      })

      const position = await getPosition()
      expect(position).toEqual({ lat: a_latitude, lng: a_longitude })
    })
  })

  describe('when is not ok', () => {
    it('retrieve an error position', async () => {
      navigator.geolocation.getCurrentPosition.mockImplementation((success, error) => {
        error(new Error('Permission denied'))
      })

      await expect(getPosition()).rejects.toThrow('No podemos obtener tu localización')
    })
  })
  
  describe('when geolocation is not available', () => {
    it('throws error if navigator.geolocation is missing', async () => {
      vi.stubGlobal('navigator', {})
      await expect(getPosition()).rejects.toThrow('La geolocalización no está disponible en este dispositivo')
    })
  })
})
