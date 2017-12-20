
import { mount } from 'vue-test-utils'
import BusMap from '@/pages/BusMap'
import { retrieveAllBusStops } from '../../src/core/commands'
jest.mock('@/core/geolocation')

describe('BusMap', () => {
  let wrapper
  let firstMarker
  beforeEach(async () => {
    wrapper = mount(BusMap)
    const stops = await retrieveAllBusStops()
    firstMarker = stops[0]
  })

  it('has the bus stops', () => {
    expect(wrapper.vm.stops).toBeTruthy()
  })
})
