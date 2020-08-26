import { mount } from '@vue/test-utils'
import MapWithMarkers from '@/components/MapWithMarkers'
jest.mock('@/core/geolocation')

describe('MapWithMarkers', () => {
  let wrapper
  const aMarker = {
    id: 'an-id-for-mark',
    title: 'hi i am a marker title'
  }
  const someMarkers = [aMarker]
  const anIconName = 'an-irrelevant-icon.jpg'
  const fakeFormatterForTest = (selected) => {return `a fake formatter ${selected}`}

  beforeEach(async () => {
    const infoWindowContentFormatterStub = jest.fn(fakeFormatterForTest)
    wrapper = mount(MapWithMarkers, {
      propsData: {
        markers: someMarkers,
        icon: anIconName,
        infoWindowContentFormatter: infoWindowContentFormatterStub
      }
    })
  })

  it('gets the user current position', () => {
    expect(wrapper.vm.currentPosition).toBeTruthy()

    expect(wrapper.html()).toContain('Tu posición')
  })

  describe('render the markers', () => {
    it('title', () => {
      expect(wrapper.html()).toContain(aMarker.title)
    })
    it('icon', () => {
      expect(wrapper.html()).toContain(anIconName)
    })
  })

  describe('when a marker is clicked the infowindow', () => {
    it('is shown', async () => {
      wrapper.find('#marker'+aMarker.id).trigger('click')

      expect(wrapper.vm.infoWindow.opened).toBeTruthy()
    })
    it('content is populated with infoWindowContentFormatter', async () => {
      wrapper.find('#marker'+aMarker.id).trigger('click')

      expect(wrapper.vm.infoWindow.content).toBe(fakeFormatterForTest(aMarker))
    })
  })

  describe('when a infowindow with button is clicked', () => {
    let actionSpy
    beforeEach(() =>{
      actionSpy = jest.fn()
      wrapper.vm.infoWindowAction = actionSpy
      wrapper.find('#marker'+aMarker.id).trigger('click')
    })

    it('infoWindowAction is called' , () => {
      wrapper.find('#infoWindow').find('button').trigger('click')

      expect(actionSpy).toHaveBeenCalledWith(aMarker)
    })
  })
})
