let latlng
export const userCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (latlng) {
      resolve(latlng)
      return
    }
    if (isGeolocationAvailable()) {
      navigator.geolocation.getCurrentPosition((position) => {
        latlng = {lat: position.coords.latitude, lng: position.coords.longitude}
        resolve(latlng)
      }, () => { reject(new Error('No podemos obtener tu localización')) })
    }
    else {
      reject(new Error('La geolocalización no está disponible en este dispositivo'))
    }
  })
}

const isGeolocationAvailable = () => {
  return window.navigator.geolocation
}
