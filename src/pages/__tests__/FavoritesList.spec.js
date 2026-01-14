import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import FavoritesList from '../FavoritesList.vue'
import { retrieveAllFavorites } from '../../services/data'
import { useRouter } from 'vue-router'

vi.mock('../../services/data', () => ({
  retrieveAllFavorites: vi.fn()
}))

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}))

describe('FavoritesList', () => {
  let wrapper
  const push = vi.fn()
  const mockFavorites = [
    { id: '1', name: 'Bus Stop', type: 'bus', lat: 1, lng: 2 },
    { id: '2', name: 'Bizi Station', type: 'bizi', lat: 3, lng: 4 }
  ]

  beforeEach(() => {
    useRouter.mockReturnValue({ push })
    retrieveAllFavorites.mockReturnValue(mockFavorites)
    
    wrapper = mount(FavoritesList, {
      global: {
        stubs: {
          MapHeader: true,
          'q-page': { template: '<div><slot /></div>' },
          'q-list': { template: '<div><slot /></div>' },
          'q-item': { template: '<div class="favorite-item" @click="$emit(\'click\')"><slot /></div>' },
          'q-item-section': { template: '<div><slot /></div>' },
          'q-item-label': { template: '<div><slot /></div>' },
          'q-icon': true
        }
      }
    })
  })

  it('lists all favorites', () => {
    const text = wrapper.text()
    expect(text).toContain('Bus Stop')
    expect(text).toContain('Bizi Station')
    expect(retrieveAllFavorites).toHaveBeenCalled()
  })

  it('navigates to bus detail when bus favorite is clicked', async () => {
    const busItem = wrapper.findAll('.favorite-item')[0]
    await busItem.trigger('click')
    expect(push).toHaveBeenCalledWith({ name: 'bus', params: { busId: '1' } })
  })

  it('navigates to bizi detail when bizi favorite is clicked', async () => {
    const biziItem = wrapper.findAll('.favorite-item')[1]
    await biziItem.trigger('click')
    expect(push).toHaveBeenCalledWith({ name: 'bizi', params: { stationId: '2' } })
  })
})
