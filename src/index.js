import React from 'react'
import ReactDOM from 'react-dom'
import './stylesheets/index.css'
import 'bootstrap/dist/css/bootstrap.css'
import App from './App'
import unregisterServiceWorker from './registerServiceWorker'

ReactDOM.render(<App />, document.getElementById('root'))
unregisterServiceWorker()
