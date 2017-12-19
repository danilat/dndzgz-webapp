
import { mount } from 'vue-test-utils'
import BiziMap from '@/pages/BiziMap'
import { retrieveAllBiziStations } from '../../src/core/commands'

describe('BiziMap', () => {
  let wrapper
  let firstMarker
  beforeEach(async () => {
    wrapper = mount(BiziMap, {
      stubs: {
        MapWithMarkers: '<div/>'
      }
    })
    const stations = await retrieveAllBiziStations()
  })

  it('has the bizi stations', () => {
    expect(wrapper.vm.stations).toBeTruthy()
  })

  it('click on back goes to service list', () => {
    const navigationSpy = jest.fn()
    wrapper.vm.dndzgzRouter = {navigateToServiceList: navigationSpy}

    wrapper.find('#back').trigger('click')

    expect(navigationSpy).toHaveBeenCalled()
  })
})
