
import { mount } from 'vue-test-utils'
import ServiceList from '@/pages/ServiceList'
import Vue from 'vue'
Vue.prototype.$q = {theme: 'mat'}

describe('ServiceList', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(ServiceList)
  })
  it('has bus option', async () => {
    expect(wrapper.text()).toContain('Autobuses')
  })
})
