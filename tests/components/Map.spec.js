import { mount } from 'vue-test-utils'
import Map from '@/components/Map'
jest.mock('@/core/geolocation')

describe('Map', () => {
  let wrapper
  beforeEach(async () => {
    wrapper = mount(Map)
  })

  it('gets the user current position', () => {
    expect(wrapper.vm.currentPosition).toBeTruthy()
  })
})
