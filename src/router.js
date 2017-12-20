import Vue from 'vue'
import VueRouter from 'vue-router'
import {
  BUS_MAP_ROUTE, BIZI_MAP_ROUTE, TAXIS_MAP_ROUTE, TRAM_MAP_ROUTE,
  BUS_DETAIL_ROUTE, BIZI_DETAIL_ROUTE, SERVICE_LIST_ROUTE
} from '@/core/router'

Vue.use(VueRouter)

function load (component) {
  return () => import(`@/pages/${component}.vue`)
}

export default new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  mode: 'hash',
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    { name: SERVICE_LIST_ROUTE, path: '/', component: load('ServiceList') },
    { name: BUS_MAP_ROUTE, path: '/bus_map', component: load('BusMap') },
    { name: BIZI_MAP_ROUTE, path: '/bizi_map', component: load('BiziMap') },
    { name: BUS_DETAIL_ROUTE, path: '/bus/:busId', component: load('BusEstimations') },
    { name: BIZI_DETAIL_ROUTE, path: '/bizi/:stationId', component: load('BiziEstimations') },
    { name: TAXIS_MAP_ROUTE, path: '/taxis_map', component: load('TaxiMap') },
    { name: TRAM_MAP_ROUTE, path: 'tram_map', component: load('TramMap') },

    // Always leave this last one
    { path: '*', component: load('Error404') } // Not found
  ]
})
