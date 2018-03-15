import {favorites} from '@/core/favorites-repository'

describe('Favorites Repository', () => {
  it('puts a favorite', async() => {
    const aFavorite = {id: 'a fav'}
    await favorites.put(aFavorite)

    const favorite = await favorites.get(aFavorite.id)

    expect(favorite).toEqual(aFavorite)
  })
})
