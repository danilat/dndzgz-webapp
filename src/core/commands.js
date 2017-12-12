export const retrieveAllBusStops = (backendApiClient) => {
  return backendApiClient('bus').then((response) => {
    const locations = response.locations.map((location) => {
      location.lng = location.lon
      return location
    })
    return Promise.resolve(locations)
  })
}

export const retrieveBusStopEstimation = (backendApiClient, id) => {
  return backendApiClient('bus', id)
}
