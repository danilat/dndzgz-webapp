import {retrieveAllFavorites} from '@/core/commands'

describe('Retrieve All Favorites', () => {
  const someFavorites = [{name: 'a name', title: 'a title', id: 'an id', lng: 'a lng', lat:'a lat'}]
  let spiedRepository
  beforeEach(() => {
    spiedRepository = {
      all: jest.fn(() => someFavorites)
    }
  })

  it('get results', async () => {
    const favorites = await retrieveAllFavorites(spiedRepository)

    expect(favorites.length).toEqual(1)
    expect(favorites[0].name).toEqual(someFavorites[0].name)
  })
})
