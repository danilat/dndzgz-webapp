
import { mount } from 'vue-test-utils'
import Map from '@/pages/Map'
import { retrieveAllBusStops } from '../../src/core/commands'
jest.mock('@/core/geolocation')

function resolveAll() {
  return new Promise(resolve => setImmediate(resolve))
}

describe('Map', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Map)
  })
  it('is mounted', async () => {
    await retrieveAllBusStops()
    await resolveAll()
    expect(wrapper.html()).toContain('CALLE CANTANDO BAJO LA LLUVIA')
  })
})
