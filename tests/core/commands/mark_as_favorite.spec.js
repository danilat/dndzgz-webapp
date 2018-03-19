import {markAsFavorite} from '@/core/commands'

describe('Mark as Favorite', () => {
  const aPoint = {title: 'a title', id: 'an id', lng: 'a lng', lat:'a lat'}
  const aName = 'a name'
  let spiedRepository
  const aType = 'a_type'
  beforeEach(() => {
    spiedRepository = {
      put: jest.fn(favorite => favorite)
    }
  })

  describe('with a name and a point', () =>{
    it('has the name', async () => {
      const favorite = await markAsFavorite(aName, aPoint, aType, spiedRepository)

      expect(favorite.name).toEqual(aName)
    })
    it('has the type of point', async () => {
      const favorite = await markAsFavorite(aName, aPoint, aType, spiedRepository)

      expect(favorite.type).toEqual(aType)
    })
    it('has the point', async () => {
      const favorite = await markAsFavorite(aName, aPoint, aType, spiedRepository)

      expect(favorite.id).toEqual(aPoint.id)
      expect(favorite.lng).toEqual(aPoint.lng)
      expect(favorite.lat).toEqual(aPoint.lat)
    })
    it('the favorite is stored', async() =>{
      const favorite = await markAsFavorite(aName, aPoint, aType, spiedRepository)

      expect(spiedRepository.put).toBeCalledWith(favorite)
    })
  })
  it('fails without name', async () =>{
    expect.assertions(2)
    try {
      await markAsFavorite("", aPoint, aType, spiedRepository)
    } catch(error){
      expect(error).not.toBeNull()
      expect(error.message).toEqual("name is required")
    }
  })
  it('fails without type', async () =>{
    expect.assertions(2)
    try {
      await markAsFavorite(aName, aPoint, "", spiedRepository)
    } catch(error){
      expect(error).not.toBeNull()
      expect(error.message).toEqual("type is required")
    }
  })
  it('fails without point', async () =>{
    expect.assertions(2)
    try {
      await markAsFavorite(aName, null, aType, spiedRepository)
    } catch(error){
      expect(error).not.toBeNull()
      expect(error.message).toEqual("point is required")
    }
  })
})
