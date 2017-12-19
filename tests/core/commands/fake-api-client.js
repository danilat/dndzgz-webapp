export const fakeLocationsResponse = {
  locations: [{
    id: 1,
    title: 'foo',
    subtitle: 'subtitle',
    lat: "irrelevant latitude",
    lon: "irrelevant longitude"
  }]
}
export const fakeLocationsApiClient = () =>{
  return Promise.resolve(fakeLocationsResponse)
}
