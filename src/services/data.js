import { backendApiClient } from './api'
import { favoritesRepository } from './favorites'

const cachedCollections = {}

const isNotCached = (collection) => !collection || collection.length === 0

const responseWithLocationsMapper = (response) => {
  // Ensure locations exist and are an array
  if (!response || !response.locations) return []
  return response.locations.map((location) => {
    // Map lon to lng for Google Maps compatibility if needed, though Maps usually takes { lat, lng }
    // The legacy code mapped lon -> lng. We keep it but also allow lon if supported.
    return { ...location, lng: location.lon }
  })
}

const retrieveUnlessIsCached = async (service, apiClient = backendApiClient) => {
  if (isNotCached(cachedCollections[service])) {
    const response = await apiClient(service)
    cachedCollections[service] = responseWithLocationsMapper(response)
  }
  return cachedCollections[service]
}

export const clearFromCache = async (service) => {
  cachedCollections[service] = undefined
}

export const retrieveAllBusStops = (apiClient = backendApiClient) => retrieveUnlessIsCached('bus', apiClient)
export const retrieveAllBiziStations = (apiClient = backendApiClient) => retrieveUnlessIsCached('bizi', apiClient)
export const retrieveAllTaxiStops = (apiClient = backendApiClient) => retrieveUnlessIsCached('taxis', apiClient)
export const retrieveAllTramStops = (apiClient = backendApiClient) => retrieveUnlessIsCached('tram', apiClient)

export const retrieveBusStopEstimation = (id, apiClient = backendApiClient) => apiClient('bus', id)
export const retrieveBiziStationEstimation = (id, apiClient = backendApiClient) => apiClient('bizi', id)
export const retrieveTramStopEstimation = (id, apiClient = backendApiClient) => apiClient('tram', id)

export const markAsFavorite = (name, point, type, repo = favoritesRepository) => {
  if (!name) throw new Error('name is required')
  if (!point) throw new Error('point is required')
  if (!type) throw new Error('type is required')

  const favorite = { name, type, ...point }
  repo.put(favorite)
}

export const retrieveAllFavorites = (repo = favoritesRepository) => repo.all()
