import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BusDetail from '../BusDetail.vue'
import { retrieveBusStopEstimation, retrieveAllBusStops } from '../../services/data'
import { useRoute, useRouter } from 'vue-router'

vi.mock('../../services/data', () => ({
  retrieveBusStopEstimation: vi.fn(),
  retrieveAllBusStops: vi.fn()
}))

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn()
}))

describe('BusDetail', () => {
  let wrapper
  const push = vi.fn()
  const mockStop = { id: '123', title: 'Test Stop', lat: 1, lng: 2 }
  const mockEstimations = { 
    estimates: [
      { line: '21', direction: 'Center', estimate: 5 },
      { line: '33', direction: 'Station', estimate: 12 }
    ] 
  }

  beforeEach(async () => {
    useRoute.mockReturnValue({ params: { busId: '123' } })
    useRouter.mockReturnValue({ push, back: vi.fn() })
    retrieveAllBusStops.mockResolvedValue([mockStop])
    retrieveBusStopEstimation.mockResolvedValue(mockEstimations)
    
    wrapper = mount(BusDetail, {
      global: {
        stubs: {
          'q-page': { template: '<div><slot /></div>' },
          'q-toolbar': { template: '<div><slot /></div>' },
          'q-toolbar-title': { template: '<div><slot /></div>' },
          'q-btn': true,
          'q-list': { template: '<div><slot /></div>' },
          'q-item': { template: '<div><slot /></div>' },
          'q-item-section': { template: '<div><slot /></div>' },
          'q-item-label': { template: '<div><slot /></div>' },
          'q-icon': true,
          'q-spinner': true,
          'q-pull-to-refresh': { template: '<div><slot /></div>' },
          FavoriteMarker: true
        }
      }
    })
  })

  it('fetches estimations on mount', () => {
    expect(retrieveBusStopEstimation).toHaveBeenCalledWith('123')
  })

  it('displays bus estimates', async () => {
    await vi.dynamicImportSettled()
    const text = wrapper.text()
    expect(text).toContain('21 Center')
    expect(text).toContain('5 minutos')
    expect(text).toContain('33 Station')
    expect(text).toContain('12 minutos')
  })
})
