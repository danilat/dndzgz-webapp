export const DndZgzRouter = (router) => {
  return { navigateToMap }

  function navigateToMap () {
    router.push(MAP_PATH)
  }
}

export const MAP_PATH = 'map'
