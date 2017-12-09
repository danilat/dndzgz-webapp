
import { mount } from 'vue-test-utils'
import Error404 from '@/pages/Error404'
import { QBtn } from 'quasar'
import Vue from 'vue'

describe('Error404', () => {
  it('has a go home button', async () => {
    Vue.prototype.$q = {theme: 'mat'}
    const wrapper = mount(Error404)
    expect(wrapper.find(QBtn).text()).toContain('Go home')
  })
})
