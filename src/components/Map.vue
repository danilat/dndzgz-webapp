<template>
  <div></div>
</template>

<script>
import { userCurrentPosition } from '../core/geolocation'

export default {
  data () {
    return {}
  },
  async created () {
    this.currentPosition = await userCurrentPosition()
  }
}
</script>

<style>
</style>
