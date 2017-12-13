
import { mount } from 'vue-test-utils'
import ServiceList from '@/pages/ServiceList'
import Vue from 'vue'
Vue.prototype.$q = {theme: 'mat'}

describe('ServiceList', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(ServiceList)
  })
  it('has bus option', () => {
    expect(wrapper.text()).toContain('Autobuses')
  })
  it('click on bus navigates to the map', async () => {
    const navigateToMapSpy = jest.fn()
    wrapper.vm.dndzgzRouter = {navigateToMap: navigateToMapSpy}

    const busItem = wrapper.find('#busOption')
    busItem.trigger('click')
    expect(navigateToMapSpy).toHaveBeenCalled()
  })
})
