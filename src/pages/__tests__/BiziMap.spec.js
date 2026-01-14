import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BiziMap from '../BiziMap.vue'
import { retrieveAllBiziStations } from '../../services/data'
import { useRouter } from 'vue-router'

vi.mock('../../services/data', () => ({
  retrieveAllBiziStations: vi.fn()
}))

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}))

describe('BiziMap', () => {
  let wrapper
  const push = vi.fn()
  const mockStations = [
    { id: '1', title: 'Station 1', lat: 41.6, lng: -0.8 }
  ]

  beforeEach(async () => {
    useRouter.mockReturnValue({ push })
    retrieveAllBiziStations.mockResolvedValue(mockStations)
    
    wrapper = mount(BiziMap, {
      global: {
        stubs: {
          MapHeader: true,
          MapWithMarkers: true,
          'q-page': true
        }
      }
    })
  })

  it('fetches stations on mount', () => {
    expect(retrieveAllBiziStations).toHaveBeenCalled()
  })

  it('navigates to detail when a station is clicked', async () => {
    // We can call the method directly on the wrapper's vm
    // since the logic is in BiziMap.vue
    wrapper.vm.goToDetail(mockStations[0])
    expect(push).toHaveBeenCalledWith({ name: 'bizi', params: { stationId: '1' } })
  })
})
