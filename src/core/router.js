export const DndZgzRouter = (router) => {
  return { navigateToMap, navigateToBusDetail }

  function navigateToMap () {
    router.push({ name: MAP_ROUTE })
  }

  function navigateToBusDetail (id) {
    router.push({ name: BUS_DETAIL_ROUTE, params: {busId: id} })
  }
}

export const MAP_ROUTE = 'map'
export const BUS_DETAIL_ROUTE = 'bus'
