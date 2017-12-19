import { backendApiClient } from './backend-api-client'

export const retrieveAllBusStops = async (apiClient = backendApiClient) => {
  const response = await apiClient('bus')
  return responseWithLocationsMapper(response)

}

export const retrieveAllBiziStations = async (apiClient = backendApiClient) => {
  const response = await apiClient('bizi')
  return responseWithLocationsMapper(response)
}

export const retrieveAllTaxiStops = async (apiClient = backendApiClient) => {
  const response = await apiClient('taxi')
  return responseWithLocationsMapper(response)
}

const responseWithLocationsMapper = (response) => {
  return response.locations.map((location) => {
    location.lng = location.lon
    return location
  })
}

export const retrieveBusStopEstimation = (id, apiClient = backendApiClient) => {
  return apiClient('bus', id)
}

export const retrieveBiziStationEstimation = (id, apiClient = backendApiClient) => {
  return apiClient('bizi', id)
}
