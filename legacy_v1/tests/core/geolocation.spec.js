import {userCurrentPosition} from '@/core/geolocation'

const a_latitude = 'foo latitude'
const a_longitude = 'bar longitude'

describe('userCurrentPosition', () => {
  describe('when is ok', () =>{
    beforeAll(() =>{
      navigator.geolocation = {
        getCurrentPosition (success, error) {
          success({coords: {latitude: a_latitude, longitude: a_longitude}})
        }
      }
    })
    it("retrieve current position", () => {
      return userCurrentPosition().then((position)=>{
        expect(position).toBeTruthy()
        expect(position.lat).toBe(a_latitude)
        expect(position.lng).toBe(a_longitude)
      })
    })
  })

  describe('when is not ok', () =>{
    beforeAll(() =>{
      navigator.geolocation = {
        getCurrentPosition (success, error) {
          error()
        }
      }
    })
    it("retrieve an error position", () => {
      return userCurrentPosition().catch((error)=>{
        expect(error).toBeTruthy()
        expect(error instanceof Error).toBeTruthy()
      })
    })
  })

})
