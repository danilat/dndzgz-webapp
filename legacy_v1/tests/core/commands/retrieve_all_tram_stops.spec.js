import {retrieveAllTramStops} from '@/core/commands'
import {fakeLocationsApiClient} from './fake-api-client'

describe('Retrieve All Tram Stops', () => {
  it('get results', async () => {
    return retrieveAllTramStops(fakeLocationsApiClient).then((stops) => {
      expect(stops.length).toEqual(1)
      expect(stops[0].lng).toEqual(stops[0].lon)
    })
  })
})
