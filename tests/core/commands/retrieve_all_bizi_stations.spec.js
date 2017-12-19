import {retrieveAllBiziStations} from '@/core/commands'

describe('Retrieve All Bizi Stations', () => {
  it('get results', async () => {
    const stubbedData = {
      locations: [{
        id: 1,
        title: 'foo',
        subtitle: 'subtitle',
        lat: "irrelevant latitude",
        lon: "irrelevant longitude"
      }]
    }
    const backendApiClientDouble = () =>{
      return Promise.resolve(stubbedData)
    }

    return retrieveAllBiziStations(backendApiClientDouble).then((stations) => {
      expect(stations.length).toEqual(1)
      expect(stations[0].lng).toEqual(stations[0].lon)
    })
  })
})
