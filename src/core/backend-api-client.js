import fetchJsonp from 'fetch-jsonp'

export const backendApiClient = (service, id = '') => {
  return fetchJsonp(`https://dndzgz.herokuapp.com/services/${service}/${id}`)
    .then((response) => {
      return response.json()
    }).catch((response) => {
      return Promise.reject(new Error('No se han podido obtener los resultados'))
    })
}
