
import { mount } from 'vue-test-utils'
import FavoritesList from '@/pages/FavoritesList'
jest.mock('@/core/commands')
import {fakeFavorites} from '@/core/__mocks__/fake-favorites'

describe('FavoritesList', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(FavoritesList)
  })
  it('is present', () => {
    expect(wrapper.text()).toContain('Favoritos')
  })

  it('has the favorites', () => {
    expect(wrapper.vm.favorites).toBeTruthy()
    expect(wrapper.vm.favorites.length).toBeGreaterThan(0)
    expect(wrapper.vm.favorites).toEqual(fakeFavorites)
  })
})
