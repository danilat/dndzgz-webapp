import { backendApiClient } from './backend-api-client'

export const retrieveAllBusStops = async (apiClient = backendApiClient) => {
  return retreiveUnlessIsCached('bus', apiClient)
}

export const retrieveAllBiziStations = async (apiClient = backendApiClient) => {
  return retreiveUnlessIsCached('bizi', apiClient)
}

export const retrieveAllTaxiStops = async (apiClient = backendApiClient) => {
  return retreiveUnlessIsCached('taxis', apiClient)
}

export const retrieveAllTramStops = (apiClient = backendApiClient) => {
  return retreiveUnlessIsCached('tram', apiClient)
}

export const retrieveBusStopEstimation = (id, apiClient = backendApiClient) => {
  return apiClient('bus', id)
}

export const retrieveBiziStationEstimation = (id, apiClient = backendApiClient) => {
  return apiClient('bizi', id)
}

export const retrieveTramStopEstimation = (id, apiClient = backendApiClient) => {
  return apiClient('tram', id)
}

export const markAsFavorite = (name, point, favoritesRepository) => {
  if(!name){
    throw new Error("name is required");
  }
  if(!point){
    throw new Error("point is required");
  }
  const favorite = Object.assign({name: name}, point);
  return favoritesRepository.put(favorite)
}

const cachedCollections = {}
export const retreiveUnlessIsCached = async (service, apiClient) => {
  if (isNotCached(cachedCollections[service])) {
    const response = await apiClient(service)
    cachedCollections[service] = responseWithLocationsMapper(response)
  }
  return cachedCollections[service]
}
export const clearFromCache = async (service) => {
  cachedCollections[service] = undefined
}
const isNotCached = (collection) => {
  return (!collection || collection.length === 0)
}

const responseWithLocationsMapper = (response) => {
  return response.locations.map((location) => {
    location.lng = location.lon
    return location
  })
}
