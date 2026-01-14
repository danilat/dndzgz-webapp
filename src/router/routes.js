const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'bizi', name: 'bizi_map', component: () => import('pages/BiziMap.vue') },
      { path: 'bizi/:stationId', name: 'bizi', component: () => import('pages/BiziDetail.vue') },
      { path: 'tram', name: 'tram_map', component: () => import('pages/TramMap.vue') },
      { path: 'tram/:stationId', name: 'tram', component: () => import('pages/TramDetail.vue') },
      { path: 'bus', name: 'bus_map', component: () => import('pages/BusMap.vue') },
      { path: 'bus/:busId', name: 'bus', component: () => import('pages/BusDetail.vue') },
      { path: 'taxi', name: 'taxi_map', component: () => import('pages/TaxiMap.vue') },
      { path: 'favorites', name: 'favorites', component: () => import('pages/FavoritesList.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
