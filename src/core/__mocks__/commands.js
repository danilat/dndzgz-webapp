import {fakeBusEstimations, fakeBiziEstimations, fakeTramEstimations} from './fake-estimations'
import {fakeFavorites} from './fake-favorites'

export const retrieveBusStopEstimation = (id) => {
  return Promise.resolve(fakeBusEstimations)
}

export const retrieveAllBusStops = () => {
  return Promise.resolve([fakeBusEstimations])
}

export const retrieveBiziStationEstimation = (id) => {
  return Promise.resolve(fakeBiziEstimations)
}

export const retrieveAllBiziStations = () => {
  return Promise.resolve([fakeBiziEstimations])
}

export const retrieveTramStopEstimation = (id) => {
  return Promise.resolve(fakeTramEstimations)
}

export const retrieveAllTramStops = () => {
  return Promise.resolve([fakeTramEstimations])
}

export const retrieveAllFavorites = () => {
  return Promise.resolve(fakeFavorites)
}
