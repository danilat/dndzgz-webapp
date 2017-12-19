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

    return retrieveAllBusStops(backendApiClientDouble).then((stops) => {
      expect(stops.length).toEqual(1)
      expect(stops[0].lng).toEqual(stops[0].lon)
    })
  })
})
