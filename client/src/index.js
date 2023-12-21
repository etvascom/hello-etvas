import React from 'react'
import { createRoot } from 'react-dom/client'
import Root from './app/Root'
import * as serviceWorker from './serviceWorker'
import storage from '@shared/storage'
import { getQueryVars } from '@shared/funcs'

persistToken()

const root = createRoot(document.getElementById('root'))
root.render(<Root />)

serviceWorker.unregister()

function persistToken(name = 'token') {
  const qs = getQueryVars(window.location.search)
  if (qs[name]) {
    storage.setItem(name, qs[name])
    return
  }
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.REACT_APP_LOCAL_TOKEN
  ) {
    storage.setItem(name, process.env.REACT_APP_LOCAL_TOKEN)
  }
}
