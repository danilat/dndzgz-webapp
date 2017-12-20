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

export const retrieveBusStopEstimation = (id, apiClient = backendApiClient) => {
  return apiClient('bus', id)
}

export const retrieveBiziStationEstimation = (id, apiClient = backendApiClient) => {
  return apiClient('bizi', id)
}

const cachedCollections = {}
const retreiveUnlessIsCached = async (service, apiClient) => {
  const isNotCached = !cachedCollections[service]
  if (isNotCached) {
    const response = await apiClient(service)
    cachedCollections[service] = responseWithLocationsMapper(response)
  }
  return cachedCollections[service]
}

const responseWithLocationsMapper = (response) => {
  return response.locations.map((location) => {
    location.lng = location.lon
    return location
  })
}
