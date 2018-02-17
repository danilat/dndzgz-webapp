import {markAsFavorite} from '@/core/commands'

describe('Mark as Favorite', () => {
  let aPoint
  let aName
  let spiedRepository
  beforeEach(() => {
    aPoint = {title: 'a title', id: 'an id', lng: 'a lng', lat:'a lat'}
    aName = 'a name'
    spiedRepository = {
      put: jest.fn(favorite => favorite)
    }
  })

  describe('with a name and a point', () =>{
    it('has the name', async () => {
      const favorite = await markAsFavorite(aName, aPoint, spiedRepository)

      expect(favorite.name).toEqual(aName)
    })
    it('has the point', async () => {
      const favorite = await markAsFavorite(aName, aPoint, spiedRepository)

      expect(favorite.id).toEqual(aPoint.id)
      expect(favorite.lng).toEqual(aPoint.lng)
      expect(favorite.lat).toEqual(aPoint.lat)
    })
    it('the favorite is stored', async() =>{
      const favorite = await markAsFavorite(aName, aPoint, spiedRepository)

      expect(spiedRepository.put).toBeCalledWith(favorite)
    })
  })
  it('fails without name', async () =>{
    expect.assertions(2)
    try {
      await markAsFavorite("", aPoint, spiedRepository)
    } catch(error){
      expect(error).not.toBeNull()
      expect(error.message).toEqual("name is required")
    }
  })
  it('fails without point', async () =>{
    expect.assertions(2)
    try {
      await markAsFavorite(aName, null, spiedRepository)
    } catch(error){
      expect(error).not.toBeNull()
      expect(error.message).toEqual("point is required")
    }
  })
})
