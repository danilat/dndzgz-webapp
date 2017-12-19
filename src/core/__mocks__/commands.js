import {fakeBusEstimations} from './fake-estimations'

export const retrieveBusStopEstimation = (id) => {
  return Promise.resolve(fakeBusEstimations)
}
