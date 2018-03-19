const collection = {}
export const inMemoryFavoritesRepository = {
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

if (typeof window.localStorage === 'undefined' || window.localStorage === null) {
  window.localStorage = require('localStorage')
}

export const localStorageFavoritesRepository = {
  put (favorite) {
    const collection = this.storedFavorites()
    collection[favorite.id] = favorite
    localStorage.setItem('favorites', JSON.stringify(collection))
  },
  get (id) {
    return this.storedFavorites()[id]
  },
  all () {
    return Object.values(this.storedFavorites())
  },
  storedFavorites () {
    let collection = JSON.parse(localStorage.getItem('favorites'))
    if (!collection) {
      collection = {}
    }
    return collection
  }
}
export const favoritesRepository = localStorageFavoritesRepository
