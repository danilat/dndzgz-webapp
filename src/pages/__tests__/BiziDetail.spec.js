import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import BiziDetail from '../BiziDetail.vue'
import { retrieveBiziStationEstimation, retrieveAllBiziStations } from '../../services/data'
import { useRoute, useRouter } from 'vue-router'

vi.mock('../../services/data', () => ({
  retrieveBiziStationEstimation: vi.fn(),
  retrieveAllBiziStations: vi.fn(),
  markAsFavorite: vi.fn()
}))

vi.mock('vue-router', () => ({
  useRoute: vi.fn(),
  useRouter: vi.fn()
}))

describe('BiziDetail', () => {
  let wrapper
  const push = vi.fn()
  const mockStation = { id: '123', title: 'Test Station', lat: 1, lng: 2 }
  const mockEstimations = { bikes: 5, parkings: 10 }

  beforeEach(async () => {
    useRoute.mockReturnValue({ params: { stationId: '123' } })
    useRouter.mockReturnValue({ push, back: vi.fn() })
    retrieveAllBiziStations.mockResolvedValue([mockStation])
    retrieveBiziStationEstimation.mockResolvedValue(mockEstimations)
    
    wrapper = mount(BiziDetail, {
      global: {
        stubs: {
          'q-page': { template: '<div><slot /></div>' },
          'q-toolbar': { template: '<div><slot /></div>' },
          'q-toolbar-title': { template: '<div><slot /></div>' },
          'q-btn': { template: '<button @click="$emit(\'click\')"><slot /></button>' },
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

  it('fetches estimations and station info on mount', () => {
    expect(retrieveBiziStationEstimation).toHaveBeenCalledWith('123')
    expect(retrieveAllBiziStations).toHaveBeenCalled()
  })

  it('displays bikes and parkings', async () => {
    // Need to wait for promises in onMounted
    await vi.dynamicImportSettled()
    const text = wrapper.text()
    expect(text).toContain('5 bicis')
    expect(text).toContain('10 aparcamientos')
  })
})
