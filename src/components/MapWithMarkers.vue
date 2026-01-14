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
          clickable: true
        }"
        @click="showMarkerInfo(index)"
      />

      <InfoWindow
        v-if="infoWindow.opened"
        :options="{
          position: infoWindow.marker,
          pixelOffset: { width: 0, height: -35 }
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
          clickable: true
        }"
        @click="center = currentPosition"
      />

      <Polyline
        v-if="path"
        :options="{
          path: path,
          strokeColor: '#FF0000',
          strokeOpacity: 1.0,
          strokeWeight: 2
        }"
      />
    </GoogleMap>
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
  path: { type: Array, default: null }
})

const center = ref({ lat: 41.641184, lng: -0.894032 })
const zoom = ref(16)
const { coords, getPosition } = useGeolocation()

const currentPosition = computed(() => coords.value)

const infoWindow = ref({
  opened: false,
  marker: null,
  content: ''
})

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
      center.value = pos
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
