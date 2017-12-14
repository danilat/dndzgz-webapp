export const DndZgzRouter = (router) => {
  return { navigateToMap, navigateToBusDetail, navigateToServiceList, getParam }

  function navigateToMap () {
    router.push({ name: MAP_ROUTE })
  }

  function navigateToBusDetail (id) {
    router.push({ name: BUS_DETAIL_ROUTE, params: {busId: id} })
  }

  function navigateToServiceList () {
    router.push({ name: SERVICE_LIST_ROUTE })
  }

  function getParam (param) {
    return router.currentRoute.params[param]
  }
}

export const MAP_ROUTE = 'map'
export const BUS_DETAIL_ROUTE = 'bus'
export const SERVICE_LIST_ROUTE = 'servicesList'
