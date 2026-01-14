
import { mount } from '@vue/test-utils'
import BiziEstimations from '@/pages/BiziEstimations'
jest.mock('@/core/router')
jest.mock('@/core/commands')
import {fakeBiziEstimations} from '@/core/__mocks__/fake-estimations'

describe('BiziEstimations', () => {
  let wrapper
  let estimations
  beforeEach( async () => {
    wrapper = mount(BiziEstimations)
    await resolveAll()
  })

  it('should have available bikes', () => {
    const bikes = wrapper.find('.estimated_bikes').text()
    expect(bikes).toContain(fakeBiziEstimations.bikes)
  })

  it('should have available parkings', () => {
    const parkings = wrapper.find('.estimated_parkings').text()
    expect(parkings).toContain(fakeBiziEstimations.parkings)
  })
})
