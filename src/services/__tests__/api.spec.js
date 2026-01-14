import { describe, it, expect, vi } from 'vitest'
import { backendApiClient } from '../api'
import fetchJsonp from 'fetch-jsonp'

vi.mock('fetch-jsonp')

describe('Backend API Client', () => {
  it('retrieve results for a service', async () => {
    fetchJsonp.mockResolvedValue({
      json: () => Promise.resolve({ some: 'data' })
    })

    const results = await backendApiClient('bus')
    expect(results).toEqual({ some: 'data' })
    expect(fetchJsonp).toHaveBeenCalledWith('https://api.dndzgz.com/services/bus/')
  })

  it('retrieve results with an id', async () => {
    fetchJsonp.mockResolvedValue({
      json: () => Promise.resolve({ estimates: [] })
    })

    const result = await backendApiClient('bus', 191)
    expect(result).toEqual({ estimates: [] })
    expect(fetchJsonp).toHaveBeenCalledWith('https://api.dndzgz.com/services/bus/191')
  })

  it('handles errors', async () => {
    fetchJsonp.mockRejectedValue(new Error('Network error'))

    await expect(backendApiClient('bus')).rejects.toThrow('No se han podido obtener los resultados')
  })
})
