
import { mount } from 'vue-test-utils'
import BusEstimations from '@/pages/BusEstimations'
jest.mock('@/core/router')
jest.mock('@/core/commands')
import {fakeEstimations} from '@/core/__mocks__/fake-estimations'


describe('BusEstimations', () => {
  let wrapper
  let estimations
  beforeEach( async () => {
    wrapper = mount(BusEstimations)
    await resolveAll()

    estimations = wrapper.findAll('.estimation')

  })

  it('should have estimations', () => {
    expect(estimations.length).toBe(fakeEstimations.estimates.length)
  })

  it('the estimations should have direction, line and time', () => {
    for (let index=0; index < estimations.length; index++) {
      const fakeEstiation = fakeEstimations.estimates[index]
      const estimation = estimations.at(index)
      expect(estimation.text()).toContain(fakeEstiation.direction)
      expect(estimation.text()).toContain(fakeEstiation.estimate)
      expect(estimation.text()).toContain(fakeEstiation.line)
    }
  })


})
