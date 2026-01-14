<template>
  <q-page class="column">
    <q-toolbar class="bg-primary text-white">
      <q-toolbar-title>
        DNDzgz
      </q-toolbar-title>
    </q-toolbar>

    <q-list separator>
      <q-item clickable v-ripple to="/bus" id="busOption">
        <q-item-section avatar>
          <img src="marker-bus.png" width="32" height="32" />
        </q-item-section>
        <q-item-section>Autobuses</q-item-section>
        <q-item-section side>
          <q-icon name="arrow_forward" color="grey" />
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/bizi" id="biziOption">
        <q-item-section avatar>
           <img src="marker-bizi.png" width="32" height="32" />
        </q-item-section>
        <q-item-section>Bizi</q-item-section>
         <q-item-section side>
          <q-icon name="arrow_forward" color="grey" />
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/tram" id="tramOption">
        <q-item-section avatar>
           <img src="marker-tram.png" width="32" height="32" />
        </q-item-section>
        <q-item-section>Tranvía</q-item-section>
         <q-item-section side>
          <q-icon name="arrow_forward" color="grey" />
        </q-item-section>
      </q-item>

      <q-item clickable v-ripple to="/taxi" id="taxiOption">
        <q-item-section avatar>
           <img src="marker-taxis.png" width="32" height="32" />
        </q-item-section>
        <q-item-section>Taxi</q-item-section>
         <q-item-section side>
          <q-icon name="arrow_forward" color="grey" />
        </q-item-section>
      </q-item>
    </q-list>
    
    <q-separator />

    <q-list separator>
      <q-item clickable v-ripple to="/favorites" id="favoritesOption">
        <q-item-section avatar>
           <img src="marker-favorite.png" width="32" height="32" />
        </q-item-section>
        <q-item-section>Favoritos</q-item-section>
         <q-item-section side>
          <q-icon name="arrow_forward" color="grey" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useGeolocation } from '../composables/useGeolocation'

const { getPosition } = useGeolocation()

onMounted(async () => {
  try {
    await getPosition()
  } catch (e) {
    console.error('Could not get position', e)
  }
})
</script>
