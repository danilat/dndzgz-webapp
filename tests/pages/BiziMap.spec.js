
import { mount } from 'vue-test-utils'
import BiziMap from '@/pages/BiziMap'
import { retrieveAllBiziStations } from '../../src/core/commands'

describe('BiziMap', () => {
  let wrapper
  let firstStation
  beforeEach(async () => {
    wrapper = mount(BiziMap, {
      stubs: {
        MapWithMarkers: '<div/>'
      }
    })
    const stations = await retrieveAllBiziStations()
    firstStation = stations[0]
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

  it('navigates to bizi detail', () => {
    const navigationSpy = jest.fn()
    wrapper.vm.dndzgzRouter = {navigateToBiziDetail: navigationSpy}

    wrapper.vm.goToDetail(firstStation)

    expect(navigationSpy).toHaveBeenCalledWith(firstStation.id)
  })
})
