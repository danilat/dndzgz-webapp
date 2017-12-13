
import { mount } from 'vue-test-utils'
import BusEstimations from '@/pages/BusEstimations'

describe('BusEstimations', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(BusEstimations)
  })

  it('is mounted', () => {
    expect(wrapper.exists()).toBe(true)
  })
})
