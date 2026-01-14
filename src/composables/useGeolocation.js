import { ref } from 'vue'

export function useGeolocation() {
  const coords = ref(null)
  const error = ref(null)

  const getPosition = () => {
    return new Promise((resolve, reject) => {
      if (coords.value) {
        resolve(coords.value)
        return
      }

      if (!('geolocation' in navigator)) {
        error.value = 'La geolocalización no está disponible en este dispositivo'
        reject(new Error(error.value))
        return
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          coords.value = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          }
          resolve(coords.value)
        },
        () => {
          error.value = 'No podemos obtener tu localización'
          reject(new Error(error.value))
        }
      )
    })
  }

  return { coords, error, getPosition }
}
