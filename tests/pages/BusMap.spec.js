
import { mount } from 'vue-test-utils'
import BusMap from '@/pages/BusMap'
import { retrieveAllBusStops } from '../../src/core/commands'
jest.mock('@/core/geolocation')

describe('BusMap', () => {
  let wrapper
  let firstMarker
  beforeEach(async () => {
    wrapper = mount(BusMap)
    const markers = await retrieveAllBusStops()
    firstMarker = markers[0]
  })

  it('has the bus stops', () => {
    expect(wrapper.html()).toContain('GOYA')
  })
  
  it('click on back goes to service list', () => {
    const navigationSpy = jest.fn()
    wrapper.vm.dndzgzRouter = {navigateToServiceList: navigationSpy}

    wrapper.find('#back').trigger('click')

    expect(navigationSpy).toHaveBeenCalled()
  })
})
