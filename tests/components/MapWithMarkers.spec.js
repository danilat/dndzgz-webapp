import { mount } from 'vue-test-utils'
import MapWithMarkers from '@/components/MapWithMarkers'
jest.mock('@/core/geolocation')

describe('MapWithMarkers', () => {
  let wrapper
  const aMarker = {
    title: 'hi i am a marker title'
  }
  const someMarkers = [aMarker]
  const anIconName = 'an-irrelevant-icon.jpg'

  beforeEach(async () => {
    wrapper = mount(MapWithMarkers, {
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
