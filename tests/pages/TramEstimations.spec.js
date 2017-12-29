import { mount } from 'vue-test-utils'
import TramEstimations from '@/pages/TramEstimations'
jest.mock('@/core/router')
jest.mock('@/core/commands')
import {fakeTramEstimations} from '@/core/__mocks__/fake-estimations'

describe('TramEstimations', () => {
  let wrapper
  let estimations
  beforeEach( async () => {
    wrapper = mount(TramEstimations)
    await resolveAll()
  })

  it('should have estimations', () => {
    const estimations = wrapper.findAll('.estimation')
    expect(estimations.length).toBe(fakeTramEstimations.estimates.length)
  })

  it('the estimations should have direction, line and time', () => {
    const estimations = wrapper.findAll('.estimation')
    for (let index=0; index < estimations.length; index++) {
      const fakeEstiation = fakeTramEstimations.estimates[index]
      const estimation = estimations.at(index)
      expect(estimation.text()).toContain(fakeEstiation.direction)
      expect(estimation.text()).toContain(fakeEstiation.estimate)
      expect(estimation.text()).toContain(fakeEstiation.line)
    }
  })
})
