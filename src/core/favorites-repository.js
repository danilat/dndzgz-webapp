const collection = {}
export const favoritesRepository = {
  put (favorite) {
    collection[favorite.id] = favorite
  },
  get (id) {
    return collection[id]
  },
  all () {
    return Object.values(collection)
  }
}
