const express = require('express')
const parser = require('body-parser')
const cors = require('cors')
const routes = require('./routes')
const etvasEvents = require('./etvas-events')
const proxy = require('./routes/utils/proxy')

const etvas = require('@etvas/etvas-sdk')

etvas.init({
  apiKey: process.env.ETVAS_API_KEY,
  apiURL: process.env.ETVAS_REST_URI,
  eventSecret: process.env.ETVAS_EVENT_SECRET || 'DEV_PLACEHOLDER',
  reqSignatureSecret: process.env.ETVAS_REQ_SIGNATURE_SECRET,
})

const app = express()
const port = process.env.PORT || 5001

const rawBodySaver = function (req, _, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8')
  }
}

app.use(cors())
app.use(parser.json({ verify: rawBodySaver, limit: '1mb' }))
app.use(parser.urlencoded({ extended: true }))

const mainRouter = express.Router()

const createRouter = route => {
  const router = express.Router()
  if (route.middleware) {
    router[route.method](route.url, route.middleware, proxy(route))
  } else {
    router[route.method](route.url, proxy(route))
  }
  return router
}

routes.forEach(route => {
  const router = createRouter(route)
  mainRouter.use('/', router)
})

// Register Etvas events routes
etvasEvents.forEach(etvasEvent => {
  etvas.events.on(etvasEvent.name, etvasEvent.handler)
})

if (process.env.NODE_ENV === 'production') {
  // Add registered event routes to application
  app.use('/etvas/events', etvas.events())
  // Add own routes to application
  app.use('/', mainRouter)
} else {
  app.use((req, res, next) => {
    console.info(`${req.method}: ${req.url}`)
    next()
  })
  app.use('/api/etvas/events', etvas.events())
  app.use('/api', mainRouter)
}

app.listen(port, () => console.info('Server started on port', port))
