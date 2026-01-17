<template>
  <div class="map-container">
    <GoogleMap
      :api-key="apiKey"
      class="google-map"
      :center="center"
      :zoom="zoom"
      :disable-default-ui="true"
      :zoom-control="true"
    >
      <Marker
        v-for="(marker, index) in markers"
        :key="marker.id || index"
        :options="{
          position: marker,
          title: marker.title,
          icon: icon,
          clickable: true,
        }"
        @click="showMarkerInfo(index)"
      />

      <InfoWindow
        v-if="infoWindow.opened"
        :options="{
          position: infoWindow.marker,
          pixelOffset: { width: 0, height: -35 },
        }"
        @closeclick="closeInfoWindow"
      >
        <div class="info-window-content">
          <q-btn
            v-if="infoWindowAction"
            flat
            dense
            color="primary"
            icon-right="arrow_forward"
            @click="goToInfoWindowAction(infoWindow.marker)"
            :label="infoWindow.content"
          />
          <div v-else>
            {{ infoWindow.content }}
          </div>
        </div>
      </InfoWindow>

      <Marker
        v-if="currentPosition"
        :options="{
          position: currentPosition,
          title: 'Tu posición',
          icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
          clickable: true,
        }"
        @click="center = currentPosition"
      />

      <Polyline
        v-if="path"
        :options="{
          path: path,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2,
        }"
      />
    </GoogleMap>

    <q-dialog v-model="showTooFarDialog" persistent>
      <q-card style="min-width: 280px">
        <q-card-section class="row items-center">
          <q-icon name="location_off" color="warning" size="2rem" class="q-mr-sm" />
          <span class="text-h6">Estás lejos de Zaragoza</span>
        </q-card-section>

        <q-card-section>
          Parece que estás algo lejos de Zaragoza. Esta aplicación está diseñada para los servicios
          de transporte de Zaragoza, por lo que el mapa se centrará en la ciudad y no en tu
          ubicación.
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Entendido" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { GoogleMap, Marker, InfoWindow, Polyline } from 'vue3-google-map'
import { useGeolocation } from '../composables/useGeolocation'

const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY

const props = defineProps({
  markers: { type: Array, required: true },
  icon: { type: String, required: true },
  infoWindowContentFormatter: { type: Function, required: true },
  infoWindowAction: { type: Function, default: null },
  path: { type: Array, default: null },
})

const DEFAULT_CENTER = { lat: 41.641184, lng: -0.894032 }
const MAX_DISTANCE_FROM_CENTER_KM = 30

const center = ref({ ...DEFAULT_CENTER })
const zoom = ref(16)
const { coords, getPosition } = useGeolocation()

const currentPosition = computed(() => coords.value)
const showTooFarDialog = ref(false)

const infoWindow = ref({
  opened: false,
  marker: null,
  content: '',
})

/**
 * Calculates the distance in kilometers between two GPS coordinates
 * using the Haversine formula
 */
const calculateDistanceKm = (coord1, coord2) => {
  const EARTH_RADIUS_KM = 6371
  const toRadians = (degrees) => degrees * (Math.PI / 180)

  const lat1Rad = toRadians(coord1.lat)
  const lat2Rad = toRadians(coord2.lat)
  const deltaLat = toRadians(coord2.lat - coord1.lat)
  const deltaLng = toRadians(coord2.lng - coord1.lng)

  const a =
    Math.sin(deltaLat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLng / 2) ** 2

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

  return EARTH_RADIUS_KM * c
}

const showMarkerInfo = (index) => {
  const selected = props.markers[index]
  infoWindow.value.marker = selected
  center.value = { lat: selected.lat, lng: selected.lng }
  infoWindow.value.content = props.infoWindowContentFormatter(selected)
  infoWindow.value.opened = true
}

const closeInfoWindow = () => {
  infoWindow.value.opened = false
}

const goToInfoWindowAction = (marker) => {
  if (props.infoWindowAction) {
    props.infoWindowAction(marker)
  }
}

onMounted(async () => {
  try {
    const pos = await getPosition()
    if (pos) {
      const distanceFromCenter = calculateDistanceKm(pos, DEFAULT_CENTER)
      if (distanceFromCenter <= MAX_DISTANCE_FROM_CENTER_KM) {
        center.value = pos
      } else {
        showTooFarDialog.value = true
      }
    }
  } catch (err) {
    console.error('Geolocation failed', err)
  }
})
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 80vh; /* Adjust height as needed */
  position: relative;
}
.google-map {
  width: 100%;
  height: 100%;
}
</style>
