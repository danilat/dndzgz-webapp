<template>
  <div class="layout-padding">
    <gmap-map
    :center="center"
    :zoom="7"
    style=""
  >
      <gmap-marker
        :key="index"
        v-for="(m, index) in markers"
        :position="m"
        :clickable="true"
        :draggable="true"
        @click="center=m"
        icon="http://www.dndzgz.com/cache/markers/marker-bus.png"
      ></gmap-marker>
      <gmap-polyline :path="markers">
      </gmap-polyline>
    </gmap-map>
  </div>
</template>

<script>
export default {
  data () {
    return {
      center: {lat: 10.0, lng: 10.0},
      markers: [
        {lat: 10.0, lng: 10.0},
        {lat: 11.0, lng: 11.0}
      ]
    }
  }
}
</script>

<style>
.vue-map-container{
  position: relative;
}
.vue-map{
    height: 0;
    overflow: hidden;
    width: 100%;
    padding-bottom: 22.25%;
    padding-top: 30px;
    position: relative;
}
</style>
