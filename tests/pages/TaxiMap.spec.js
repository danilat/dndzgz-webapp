
import { mount } from 'vue-test-utils'
import TaxiMap from '@/pages/TaxiMap'

describe('TaxiMap', () => {
  let wrapper
  let firstStop
  beforeEach(async () => {
    wrapper = mount(TaxiMap, {
      stubs: {
        MapWithMarkers: '<div/>'
      }
    })
  })

  it('has the taxi stops', () => {
    expect(wrapper.vm.stops).toBeTruthy()
  })
})
