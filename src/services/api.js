import fetchJsonp from 'fetch-jsonp'

export const backendApiClient = (service, id = '') => {
  return fetchJsonp(`https://api.dndzgz.com/services/${service}/${id}`)
    .then((response) => response.json())
    .catch(() => {
      throw new Error('No se han podido obtener los resultados')
    })
}
