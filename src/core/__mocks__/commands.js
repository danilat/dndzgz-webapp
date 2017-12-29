import {fakeBusEstimations, fakeBiziEstimations, fakeTramEstimations} from './fake-estimations'

export const retrieveBusStopEstimation = (id) => {
  return Promise.resolve(fakeBusEstimations)
}

export const retrieveBiziStationEstimation = (id) => {
  return Promise.resolve(fakeBiziEstimations)
}

export const retrieveTramStopEstimation = (id) => {
  return Promise.resolve(fakeTramEstimations)
}
