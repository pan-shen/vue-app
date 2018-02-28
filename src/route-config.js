export function configRouter (router) {
  router.map({
    '/income': {
      component: require('./page/income.vue')
    },
    '/cost': {
      component: require('./page/cost.vue')
    },
    '/detail': {
      component: require('./page/detail.vue')
    },
    '*': {
      component: require('./page/money.vue')
    }
  })
}
