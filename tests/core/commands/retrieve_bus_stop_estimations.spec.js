import {retrieveBusStopEstimation} from '@/core/commands'

describe('Retrieve Bus Stop Estimation', () => {
  it('get the result', async () => {
    const fakeStop = {
      id: 1,
      line: 'a line',
      direction: 'a direction',
      estimation: '10 minutes'
    }
    const backendApiClientDouble = () =>{
      return Promise.resolve(fakeStop)
    }

    retrieveBusStopEstimation(backendApiClientDouble, fakeStop.id).then((stop) => {
      expect(stop.line).toEqual(fakeStop.line)
      expect(stop.direction).toEqual(fakeStop.direction)
      expect(stop.estimation).toEqual(fakeStop.estimation)
    })
  })
})
