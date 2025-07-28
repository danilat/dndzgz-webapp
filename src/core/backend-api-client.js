import fetchJsonp from 'fetch-jsonp'

export const backendApiClient = (service, id = '') => {
  return fetchJsonp(`https://api.dndzgz.com/services/${service}/${id}`)
    .then((response) => {
      return response.json()
    }).catch((response) => {
      return Promise.reject(new Error('No se han podido obtener los resultados'))
    })
}
