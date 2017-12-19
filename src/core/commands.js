import { backendApiClient } from './backend-api-client'

export const retrieveAllBusStops = (apiClient = backendApiClient) => {
  return apiClient('bus').then((response) => {
    return response.locations.map((location) => {
      location.lng = location.lon
      return location
    })
  })
}

export const retrieveAllBiziStations = (apiClient = backendApiClient) => {
  return apiClient('bizi').then((response) => {
    return response.locations.map((location) => {
      location.lng = location.lon
      return location
    })
  })
}

export const retrieveBusStopEstimation = (id, apiClient = backendApiClient) => {
  return apiClient('bus', id)
}
