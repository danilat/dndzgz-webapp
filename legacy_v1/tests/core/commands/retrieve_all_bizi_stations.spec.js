import {retrieveAllBiziStations} from '@/core/commands'
import {fakeLocationsApiClient} from './fake-api-client'

describe('Retrieve All Bizi Stations', () => {
  it('get results', async () => {
    return retrieveAllBiziStations(fakeLocationsApiClient).then((stations) => {
      expect(stations.length).toEqual(1)
      expect(stations[0].lng).toEqual(stations[0].lon)
    })
  })
})
