import fetchJsonp from 'fetch-jsonp'

export const backendApiClient = (service, id = '') => {
  console.log('backendApiClient')
  return fetchJsonp(`http://api.dndzgz.com/services/${service}/${id}`)
    .then((response) => {
      console.log('responseddddd')
      return response.json()
    })
}
