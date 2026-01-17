import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import TaxiMap from '../TaxiMap.vue'
import { retrieveAllTaxiStops } from '../../services/data'
import { useRouter } from 'vue-router'

vi.mock('../../services/data', () => ({
  retrieveAllTaxiStops: vi.fn(),
}))

vi.mock('vue-router', () => ({
  useRouter: vi.fn(),
}))

describe('TaxiMap', () => {
  const push = vi.fn()
  const mockStops = [{ id: '1', title: 'Taxi Stand 1', lat: 41.6, lng: -0.8 }]

  beforeEach(async () => {
    useRouter.mockReturnValue({ push })
    retrieveAllTaxiStops.mockResolvedValue(mockStops)

    mount(TaxiMap, {
      global: {
        stubs: {
          MapHeader: true,
          MapWithMarkers: true,
          'q-page': true,
        },
      },
    })
  })

  it('fetches taxi stands on mount', () => {
    expect(retrieveAllTaxiStops).toHaveBeenCalled()
  })
})
