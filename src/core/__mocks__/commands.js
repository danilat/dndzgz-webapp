import {fakeBusEstimations, fakeBiziEstimations} from './fake-estimations'

export const retrieveBusStopEstimation = (id) => {
  return Promise.resolve(fakeBusEstimations)
}

export const retrieveBiziStationEstimation = (id) => {
  return Promise.resolve(fakeBiziEstimations)
}
