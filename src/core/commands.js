export const retrieveAllBusStops = ((backendApiClient)=>{
  return backendApiClient('bus').then((response) => {
    return Promise.resolve(response.locations)
  })
})

export const retrieveBusStopEstimation = ((backendApiClient, id)=>{
  return backendApiClient('bus', id)
})
