import { mount } from '@vue/test-utils'
import MapHeader from '@/components/MapHeader'

describe('MapHeader', () => {
  const aTitle = 'Irrelevant title'
  let wrapper
  beforeEach(() => {
    wrapper = mount(MapHeader, {
      propsData: {
        title: aTitle,
      }
    })
  })

  it('has the title', () => {
    expect(wrapper.find('#header_title').text()).toBe(aTitle)
  })

  it('click on back goes to service list', () => {
    const navigationSpy = jest.fn()
    wrapper.vm.dndzgzRouter = {navigateToServiceList: navigationSpy}

    wrapper.find('#back').trigger('click')

    expect(navigationSpy).toHaveBeenCalled()
  })
})
