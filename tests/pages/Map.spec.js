
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

  it('has the bus stops', async () => {
    expect(wrapper.html()).toContain('CALLE CANTANDO BAJO LA LLUVIA')
  })

  it('shows the marker title in the infowindow when a marker is clicked', () => {
    wrapper.find('#marker'+firstMarker.id).trigger('click')

    expect(wrapper.find('#infoWindow').text()).toContain(firstMarker.title)
  })

  it('click on infowindow button navigates bus detail', async () => {
    const navigateToMapSpy = jest.fn()
    wrapper.vm.dndzgzRouter = {navigateToBusDetail: navigateToMapSpy}

    wrapper.find('#marker'+firstMarker.id).trigger('click')
    wrapper.find('#infoWindow').find('button').trigger('click')

    expect(navigateToMapSpy).toHaveBeenCalledWith(firstMarker.id)
  })
})
