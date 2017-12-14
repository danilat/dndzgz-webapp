
import { mount } from 'vue-test-utils'
import Map from '@/pages/Map'
import { retrieveAllBusStops } from '../../src/core/commands'
jest.mock('@/core/geolocation')

describe('Map', () => {
  let wrapper
  let firstMarker
  beforeEach(async () => {
    wrapper = mount(Map)
    const markers = await retrieveAllBusStops()
    firstMarker = markers[0]
  })

  it('has the bus stops', () => {
    expect(wrapper.html()).toContain('GOYA')
  })

  it('shows the marker title in the infowindow when is clicked', () => {
    wrapper.find('#marker'+firstMarker.id).trigger('click')

    expect(wrapper.find('#infoWindow').text()).toContain(firstMarker.title)
  })

  it('click on infowindow button navigates bus detail', () => {
    const navigationSpy = jest.fn()
    wrapper.vm.dndzgzRouter = {navigateToBusDetail: navigationSpy}
    wrapper.find('#marker'+firstMarker.id).trigger('click')

    wrapper.find('#infoWindow').find('button').trigger('click')

    expect(navigationSpy).toHaveBeenCalledWith(firstMarker.id)
  })

  it('click on back goes to service list', () => {
    const navigationSpy = jest.fn()
    wrapper.vm.dndzgzRouter = {navigateToServiceList: navigationSpy}

    wrapper.find('#back').trigger('click')

    expect(navigationSpy).toHaveBeenCalled()
  })
})
