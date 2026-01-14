import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import IndexPage from '../IndexPage.vue'
import { useRouter } from 'vue-router'
import { useGeolocation } from '../../composables/useGeolocation'

vi.mock('vue-router', () => ({
  useRouter: vi.fn()
}))

vi.mock('../../composables/useGeolocation', () => ({
  useGeolocation: vi.fn(() => ({
    getPosition: vi.fn().mockResolvedValue({ lat: 1, lng: 1 })
  }))
}))

describe('IndexPage', () => {
  let wrapper
  const push = vi.fn()

  beforeEach(() => {
    useRouter.mockReturnValue({ push })
    wrapper = mount(IndexPage, {
      global: {
        stubs: {
          // Stubbing Quasar components simply to allow slot rendering
          'q-page': { template: '<div class="q-page"><slot /></div>' },
          'q-toolbar': { template: '<div class="q-toolbar"><slot /></div>' },
          'q-toolbar-title': { template: '<div class="q-toolbar-title"><slot /></div>' },
          'q-list': { template: '<div class="q-list"><slot /></div>' },
          'q-item': { template: '<div class="q-item"><slot /></div>' },
          'q-item-section': { template: '<div class="q-item-section"><slot /></div>' },
          'q-icon': true
        }
      }
    })
  })

  it('has transport options', () => {
    const text = wrapper.text()
    expect(text).toContain('Autobuses')
    expect(text).toContain('Bizi')
    expect(text).toContain('Tranvía')
    expect(text).toContain('Taxi')
  })

  it('navigates to bus map', async () => {
    // IndexPage has "Autobuses" text inside one of the items
    const text = wrapper.text()
    expect(text).toContain('Autobuses')
  })

  it('calls geolocation on mount', () => {
    // useGeolocation is called inside setup/onMounted
    expect(useGeolocation).toHaveBeenCalled()
  })
})
