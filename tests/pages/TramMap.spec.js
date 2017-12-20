
import { mount } from 'vue-test-utils'
import TramMap from '@/pages/TramMap'

describe('TramMap', () => {
  let wrapper
  let firstStop
  beforeEach(async () => {
    wrapper = mount(TramMap, {
      stubs: {
        MapWithMarkers: '<div/>'
      }
    })
  })

  it('has the tram stops', () => {
    expect(wrapper.vm.stops).toBeTruthy()
  })
})
