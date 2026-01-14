import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TramMap from '../TramMap.vue'
import { retrieveAllTramStops } from '../../services/data'
import { useRouter } from 'vue-router'

vi.mock('../../services/data', () => ({
  retrieveAllTramStops: vi.fn()
}))

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}))

describe('TramMap', () => {
  let wrapper
  const push = vi.fn()
  const mockStops = [
    { id: '1', title: 'Station 1', lat: 41.6, lng: -0.8 }
  ]

  beforeEach(async () => {
    useRouter.mockReturnValue({ push })
    retrieveAllTramStops.mockResolvedValue(mockStops)
    
    wrapper = mount(TramMap, {
      global: {
        stubs: {
          MapHeader: true,
          MapWithMarkers: true,
          'q-page': true
        }
      }
    })
  })

  it('fetches tram stops on mount', () => {
    expect(retrieveAllTramStops).toHaveBeenCalled()
  })

  it('navigates to detail when a station is clicked', async () => {
    wrapper.vm.goToDetail(mockStops[0])
    expect(push).toHaveBeenCalledWith({ name: 'tram', params: { stationId: '1' } })
  })
})
