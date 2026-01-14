const STORAGE_KEY = 'favorites'

export const favoritesRepository = {
  put(favorite) {
    const collection = this.allAsMap()
    collection[favorite.id] = favorite
    localStorage.setItem(STORAGE_KEY, JSON.stringify(collection))
  },
  get(id) {
    return this.allAsMap()[id]
  },
  all() {
    return Object.values(this.allAsMap())
  },
  allAsMap() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : {}
    } catch {
      return {}
    }
  }
}
