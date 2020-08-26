import { mount } from '@vue/test-utils'
import FavoriteMarker from '@/components/FavoriteMarker'
import {retrieveAllFavorites} from '@/core/commands'
import {favoritesRepository} from '@/core/favorites-repository'

describe('mark as favorite', () => {
  const aPoint = {}
  const aType = 'a irrelevant type'
  const aName = "a name"
  let wrapper
  beforeEach( async () => {
    wrapper = mount(FavoriteMarker, {
      propsData: {
        opened: false,
        point: aPoint,
        type: aType,
        close: jest.fn()
      }
    })
  })

  it('with a name', async () => {
    wrapper.vm.name = aName
    wrapper.find('#favorite_button').trigger('click')

    const favorites = await retrieveAllFavorites(favoritesRepository)
    const addedFavorite = favorites.find((favorite) => favorite.name === aName)
    expect(addedFavorite).toBeTruthy()
  })
})
