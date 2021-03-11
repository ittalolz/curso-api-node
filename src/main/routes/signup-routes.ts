import { Router } from 'express'
import { makeSingUpController } from '../factories/signup/signup'
import { adaptetRoute } from '../adapters/express-routes-adapter'

export default (router: Router): void => {
  // router.post('/signup', (req, res) => {
  //   res.json({ ok: 'ok' })
  // })
  router.post('/signup', adaptetRoute(makeSingUpController()))
}
