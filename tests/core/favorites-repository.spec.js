import {favoritesRepository} from '@/core/favorites-repository'

describe('Favorites Repository', () => {
  it('puts a favorite', async() => {
    const aFavorite = {id: 'a fav'}
    await favoritesRepository.put(aFavorite)

    const favorite = await favoritesRepository.get(aFavorite.id)

    expect(favorite).toEqual(aFavorite)
  })
  it('get all the favorites', async() => {
    const aFavorite = {id: 'a fav'}
    const anotherFavorite = {id: 'another fav'}
    await favoritesRepository.put(aFavorite)
    await favoritesRepository.put(anotherFavorite)

    const favorites = await favoritesRepository.all()

    expect(favorites.length).toEqual(2)
  })
})
