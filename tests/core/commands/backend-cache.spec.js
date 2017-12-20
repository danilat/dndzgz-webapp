import {retreiveUnlessIsCached, clearFromCache} from '@/core/commands'
import {fakeLocationsResponse} from './fake-api-client'

describe('Retreive Unless Is Cached', () => {
  const aService = 'aStupidService'

  beforeEach(() => {
    clearFromCache(aService)
  })

  it('when the cache is empty, calls to api', async () => {
    const apiSpy = jest.fn( () => {return fakeLocationsResponse})

    await retreiveUnlessIsCached(aService, apiSpy)

    expect(apiSpy).toHaveBeenCalledWith(aService)
  })

  it('api is called only the first time', async () => {
    const apiSpy = jest.fn( () => {return fakeLocationsResponse})

    await retreiveUnlessIsCached(aService, apiSpy)
    await retreiveUnlessIsCached(aService, apiSpy)

    expect(apiSpy).toHaveBeenCalledTimes(1)
  })

  it('when the locations response is empty, try to call another time to api', async () => {
    const apiFirstSpy = jest.fn( () => {return {locations: []}})
    const apiSecondSpy = jest.fn( () => {return fakeLocationsResponse})

    await retreiveUnlessIsCached(aService, apiFirstSpy)
    await retreiveUnlessIsCached(aService, apiSecondSpy)

    expect(apiFirstSpy).toHaveBeenCalledWith(aService)
    expect(apiSecondSpy).toHaveBeenCalledWith(aService)
  })
})
