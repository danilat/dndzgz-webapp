import {retrieveAllBusStops} from '@/core/commands'

describe('Retrieve All Bus Stops', () => {
  it('get results', async () => {
    const stubbedStops = {
      locations: [{
        id: 1,
        title: 'foo',
        subtitle: 'subtitle',
        lat: "irrelevant latitude",
        lon: "irrelevant longitude"
      }]
    }
    const backendApiClientDouble = () =>{
      return Promise.resolve(stubbedStops)
    }

    retrieveAllBusStops(backendApiClientDouble).then((stops) => {
      expect(stops.length).toEqual(1)
    })
  })
})
