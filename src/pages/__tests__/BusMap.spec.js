import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BusMap from '../BusMap.vue'
import { retrieveAllBusStops } from '../../services/data'
import { useRouter } from 'vue-router'

vi.mock('../../services/data', () => ({
  retrieveAllBusStops: vi.fn()
}))

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}))

describe('BusMap', () => {
  let wrapper
  const push = vi.fn()
  const mockStops = [
    { id: '1', title: 'Stop 1', lat: 41.6, lng: -0.8 }
  ]

  beforeEach(async () => {
    useRouter.mockReturnValue({ push })
    retrieveAllBusStops.mockResolvedValue(mockStops)
    
    wrapper = mount(BusMap, {
      global: {
        stubs: {
          MapHeader: true,
          MapWithMarkers: true,
          'q-page': true
        }
      }
    })
  })

  it('fetches stops on mount', () => {
    expect(retrieveAllBusStops).toHaveBeenCalled()
  })

  it('navigates to detail when a stop is clicked', async () => {
    wrapper.vm.goToDetail(mockStops[0])
    expect(push).toHaveBeenCalledWith({ name: 'bus', params: { busId: '1' } })
  })
})
