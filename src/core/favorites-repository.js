const collection = {}
export const favorites = {
  put(favorite){
    collection[favorite.id] = favorite
  },
  get(id){
    return collection[id]
  }
}
