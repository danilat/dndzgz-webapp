import {backendApiClient} from '@/core/backend-api-client'

describe('Backend API Client', () => {
  it("retrieve bus results", () => {
    return backendApiClient('bus').then((results)=>{
      expect(results).toBeTruthy()
    })
  })
  it("retrieve bizi results", () => {
    return backendApiClient('bizi').then((results)=>{
      expect(results).toBeTruthy()
    })
  })
  it("retrieve bus estimates", () => {
    return backendApiClient('bus', 191).then((result)=>{
      expect(result).toBeTruthy()
      expect(result.estimates).toBeTruthy()
    })
  })
})
