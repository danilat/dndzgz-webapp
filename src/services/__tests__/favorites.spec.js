import { describe, it, expect, beforeEach, vi } from 'vitest'
import { favoritesRepository } from '../favorites'

describe('Favorites Repository', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('puts a favorite', () => {
    const aFavorite = { id: '1', name: 'My Bus Stop', type: 'bus' }
    favoritesRepository.put(aFavorite)

    const favorite = favoritesRepository.get('1')
    expect(favorite).toEqual(aFavorite)
  })

  it('get all the favorites', () => {
    const fav1 = { id: '1', name: 'Bus 1', type: 'bus' }
    const fav2 = { id: '2', name: 'Bizi 2', type: 'bizi' }
    
    favoritesRepository.put(fav1)
    favoritesRepository.put(fav2)

    const all = favoritesRepository.all()
    expect(all.length).toBe(2)
    expect(all).toContainEqual(fav1)
    expect(all).toContainEqual(fav2)
  })

  it('handles empty collection', () => {
    const all = favoritesRepository.all()
    expect(all).toEqual([])
  })
})
