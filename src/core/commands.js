export const retrieveAllBusStops = (backendApiClient) => {
  return backendApiClient('bus').then((response) => {
    return response.locations.map((location) => {
      location.lng = location.lon
      return location
    })
  })
}

export const retrieveBusStopEstimation = (backendApiClient, id) => {
  return backendApiClient('bus', id)
}
