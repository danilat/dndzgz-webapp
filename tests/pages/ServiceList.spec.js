
import { mount } from 'vue-test-utils'
import ServiceList from '@/pages/ServiceList'
jest.mock('@/core/geolocation')

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
  it('has bizi option', () => {
    expect(wrapper.text()).toContain('Bizi')
  })
  it('click on bizi navigates to the map', async () => {
    const navigateToMapSpy = jest.fn()
    wrapper.vm.dndzgzRouter = {navigateToBiziMap: navigateToMapSpy}
    const biziItem = wrapper.find('#biziOption')

    biziItem.trigger('click')

    expect(navigateToMapSpy).toHaveBeenCalled()
  })
  it('has taxi option', () => {
    expect(wrapper.text()).toContain('Taxi')
  })
  it('click on taxi navigates to the map', async () => {
    const navigateToMapSpy = jest.fn()
    wrapper.vm.dndzgzRouter = {navigateToTaxiMap: navigateToMapSpy}
    const taxiItem = wrapper.find('#taxiOption')

    taxiItem.trigger('click')

    expect(navigateToMapSpy).toHaveBeenCalled()
  })
  it('has tram option', () => {
    expect(wrapper.text()).toContain('Tranvía')
  })
  it('click on tram navigates to the map', async () => {
    const navigateToMapSpy = jest.fn()
    wrapper.vm.dndzgzRouter = {navigateToTramMap: navigateToMapSpy}
    const tramItem = wrapper.find('#tramOption')

    tramItem.trigger('click')

    expect(navigateToMapSpy).toHaveBeenCalled()
  })
  it('has favorites option', () => {
    expect(wrapper.text()).toContain('Favoritos')
  })
  it('click on favorites navigates to the favorites list', async () => {
    const navigateToFavoritesSpy = jest.fn()
    wrapper.vm.dndzgzRouter = {navigateToFavoritesList: navigateToFavoritesSpy}
    const favoritesItem = wrapper.find('#favoritesOption')

    favoritesItem.trigger('click')

    expect(navigateToFavoritesSpy).toHaveBeenCalled()
  })
  it('gets the user current position', async () => {
    expect(wrapper.vm.currentPosition).not.toBeNull()
  })
})
