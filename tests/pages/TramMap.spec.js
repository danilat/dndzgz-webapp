
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
    firstStop = stops[0]
  })

  it('has the tram stops', () => {
    expect(wrapper.vm.stops).toBeTruthy()
    expect(wrapper.vm.stops.length > 0).toBeTruthy()
  })

  it('navigates to bizi detail', () => {
    const navigationSpy = jest.fn()
    wrapper.vm.dndzgzRouter = {navigateToTramDetail: navigationSpy}

    wrapper.vm.goToDetail(firstStop)

    expect(navigationSpy).toHaveBeenCalledWith(firstStop.id)
  })
})
