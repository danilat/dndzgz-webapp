import {retrieveBusStopEstimation} from '@/core/commands'

describe('Retrieve Bus Stop Estimation', () => {
  it('get the result', async () => {
    const fakeStop = 'foo'
    const backendApiClientDouble = () =>{
      return Promise.resolve(fakeStop)
    }

    return retrieveBusStopEstimation(fakeStop.id, backendApiClientDouble).then((stop) => {
      expect(stop).toEqual(fakeStop)
    })
  })
})
