
import { mount } from 'vue-test-utils'
import TramMap from '@/pages/TramMap'
import { retrieveAllTramStops } from '../../src/core/commands'

describe('TramMap', () => {
  let wrapper
  let firstStop
  beforeEach(async () => {
    wrapper = mount(TramMap, {
      stubs: {
        MapWithMarkers: '<div/>'
      }
    })
    const stops = await retrieveAllTramStops()
  })

  it('has the tram stops', () => {
    expect(wrapper.vm.stops).toBeTruthy()
    expect(wrapper.vm.stops.length > 0).toBeTruthy()
  })
})
