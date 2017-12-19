
import { mount } from 'vue-test-utils'
import TaxiMap from '@/pages/TaxiMap'

describe('TaxiMap', () => {
  let wrapper
  let firstStop
  beforeEach(async () => {
    wrapper = mount(TaxiMap, {
      stubs: {
        MapWithMarkers: '<div/>'
      }
    })
  })

  it('click on back goes to service list', () => {
    const navigationSpy = jest.fn()
    wrapper.vm.dndzgzRouter = {navigateToServiceList: navigationSpy}

    wrapper.find('#back').trigger('click')

    expect(navigationSpy).toHaveBeenCalled()
  })
})
