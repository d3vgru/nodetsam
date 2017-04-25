import router, { load } from '../../../reference/src/router'

router.addRoutes([
  { path: '*', component: load('Error404') }
])

export default router
