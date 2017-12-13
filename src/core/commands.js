import { backendApiClient } from './backend-api-client'

export const retrieveAllBusStops = () => {
  return allBusStops(backendApiClient)
}

export const allBusStops = (backendApiClient) => {
  return backendApiClient('bus').then((response) => {
    return response.locations.map((location) => {
      location.lng = location.lon
      return location
    })
  })
}

export const retrieveBusStopEstimation = (id, apiClient = backendApiClient) => {
  return apiClient('bus', id)
}
