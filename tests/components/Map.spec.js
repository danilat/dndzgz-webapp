import { mount } from 'vue-test-utils'
import Map from '@/components/Map'
jest.mock('@/core/geolocation')

describe('Map', () => {
  let wrapper
  const aMarker = {
    title: 'hi i am a marker title'
  }
  const someMarkers = [aMarker]
  const anIconName = 'an-irrelevant-icon.jpg'

  beforeEach(async () => {
    wrapper = mount(Map, {
      propsData: {markers: someMarkers, icon: anIconName}
    })
  })

  it('gets the user current position', () => {
    expect(wrapper.vm.currentPosition).toBeTruthy()
  })

  describe('render the markers', () => {
    it('title', () => {
      expect(wrapper.html()).toContain(aMarker.title)
    })
    it('icon', () => {
      expect(wrapper.html()).toContain(anIconName)
    })
  })
})
