
import { mount } from 'vue-test-utils'
import Map from '@/pages/Map'
import Vue from 'vue'

function resolveAll() {
  console.log('resolveAll')
  return new Promise(resolve => setImmediate(resolve))
}

describe('Map', () => {
  let wrapper
  beforeEach(() => {
    wrapper = mount(Map)
  })
  it('is mounted', async () => {
    await resolveAll()
    wrapper.update()
    return Vue.nextTick()
    .then(function () {
      expect(wrapper.html()).toContain('mis cojones 33')
    })
  })
})
