import { describe, it, expect, beforeEach, vi } from 'vitest'
import { 
  retrieveAllBusStops, 
  retrieveAllBiziStations, 
  retrieveBusStopEstimation,
  clearFromCache,
  markAsFavorite,
  retrieveAllFavorites
} from '../data'
import { backendApiClient } from '../api'
import { favoritesRepository } from '../favorites'

vi.mock('../api')
vi.mock('../favorites')

describe('Data Service', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    clearFromCache('bus')
    clearFromCache('bizi')
  })

  it('retrieveAllBusStops returns mapped locations', async () => {
    const mockResponse = {
      locations: [
        { id: '1', title: 'Stop 1', lon: -0.8, lat: 41.6 },
        { id: '2', title: 'Stop 2', lon: -0.9, lat: 41.7 }
      ]
    }
    backendApiClient.mockResolvedValue(mockResponse)

    const result = await retrieveAllBusStops()
    expect(result.length).toBe(2)
    expect(result[0].lng).toBe(-0.8)
    expect(result[0].lat).toBe(41.6)
  })

  it('caches results after first call', async () => {
    backendApiClient.mockResolvedValue({ locations: [{ id: '1' }] })

    await retrieveAllBusStops()
    await retrieveAllBusStops()

    expect(backendApiClient).toHaveBeenCalledTimes(1)
  })

  it('retrieveBusStopEstimation calls api directly', async () => {
    backendApiClient.mockResolvedValue({ estimates: [] })

    const result = await retrieveBusStopEstimation('123')
    expect(result).toEqual({ estimates: [] })
    expect(backendApiClient).toHaveBeenCalledWith('bus', '123')
  })

  it('markAsFavorite delegates to favoritesRepository', () => {
    const point = { lat: 1, lng: 2, id: '3' }
    markAsFavorite('My Fav', point, 'bus')

    expect(favoritesRepository.put).toHaveBeenCalledWith({
      id: '3',
      name: 'My Fav',
      type: 'bus',
      lat: 1,
      lng: 2
    })
  })

  it('retrieveAllFavorites delegates to favoritesRepository', () => {
    favoritesRepository.all.mockReturnValue([{ name: 'Fav' }])
    const result = retrieveAllFavorites()
    expect(result).toEqual([{ name: 'Fav' }])
  })
})
