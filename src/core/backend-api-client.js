import fetchJsonp from 'fetch-jsonp'

export const backendApiClient = (service, id = '') => {
  return fetchJsonp(`http://api.dndzgz.com/services/${service}/${id}`)
    .then((response) => {
      return response.json()
    })
}
