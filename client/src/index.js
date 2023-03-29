import React from 'react'
import ReactDOM from 'react-dom'
import Root from './app/Root'
import * as serviceWorker from './serviceWorker'
import storage from '@shared/storage'
import { getQueryVars } from '@shared/funcs'

persistToken()

ReactDOM.render(<Root />, document.getElementById('root'))

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
