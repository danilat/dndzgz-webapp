
import { mount } from 'vue-test-utils'
import BiziMap from '@/pages/BiziMap'

describe('BiziMap', () => {
  let wrapper
  let firstMarker
  beforeEach(async () => {
    wrapper = mount(BiziMap)
  })


  it('click on back goes to service list', () => {
    const navigationSpy = jest.fn()
    wrapper.vm.dndzgzRouter = {navigateToServiceList: navigationSpy}

    wrapper.find('#back').trigger('click')

    expect(navigationSpy).toHaveBeenCalled()
  })
})
