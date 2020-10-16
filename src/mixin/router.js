export var routerTransitionMixin = {
  data() {
    return {
      transitionName: 'slide-left',
      routers: [],
      status: []
    }
  },
  watch: {
    '$route'(to, from) {
      const toIndex = to.meta.index || 1
      const fromIndex = from.meta.index || 1
      if (toIndex > fromIndex) {
        this.transitionName = 'slide-in'
      } else if (toIndex < fromIndex) {
        this.transitionName = 'slide-out'
      } else {
        this.transitionName = ''
      }
    }
  }
}
