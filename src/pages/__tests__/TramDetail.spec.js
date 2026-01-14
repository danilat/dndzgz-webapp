import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TramDetail from '../TramDetail.vue'
import { retrieveTramStopEstimation, retrieveAllTramStops } from '../../services/data'
import { useRoute, useRouter } from 'vue-router'

vi.mock('../../services/data', () => ({
  retrieveTramStopEstimation: vi.fn(),
  retrieveAllTramStops: vi.fn()
}))

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn()
}))

describe('TramDetail', () => {
  let wrapper
  const push = vi.fn()
  const mockStop = { id: '123', title: 'Test Tram', lat: 1, lng: 2 }
  const mockEstimations = { 
    estimates: [
      { line: 'L1', direction: 'Mago de Oz', estimate: 3 }
    ] 
  }

  beforeEach(async () => {
    useRoute.mockReturnValue({ params: { stationId: '123' } })
    useRouter.mockReturnValue({ push, back: vi.fn() })
    retrieveAllTramStops.mockResolvedValue([mockStop])
    retrieveTramStopEstimation.mockResolvedValue(mockEstimations)
    
    wrapper = mount(TramDetail, {
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

  it('fetches tram estimations on mount', () => {
    expect(retrieveTramStopEstimation).toHaveBeenCalledWith('123')
  })

  it('displays tram estimates', async () => {
    await vi.dynamicImportSettled()
    const text = wrapper.text()
    expect(text).toContain('L1 Mago de Oz')
    expect(text).toContain('3 minutos')
  })
})
