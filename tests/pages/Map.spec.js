
import { mount } from 'vue-test-utils'
import Map from '@/pages/Map'
import { retrieveAllBusStops } from '../../src/core/commands'
jest.mock('@/core/geolocation')

function resolveAll() {
  return new Promise(resolve => setImmediate(resolve))
}

describe('Map', () => {
  let wrapper
  let markers
  beforeEach(async () => {
    wrapper = mount(Map)
    markers = await retrieveAllBusStops()
  })

  it('has the bus stops', async () => {
    await resolveAll()
    expect(wrapper.html()).toContain('CALLE CANTANDO BAJO LA LLUVIA')
  })

  it('shows the marker title in the infowindow when a marker is clicked', () => {
    const marker = markers[0]
    wrapper.find('#marker'+marker.id).trigger('click')
    expect(wrapper.find('#infoWindow').text()).toContain(marker.title)
  })
})
