import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Head from './Head'

ReactDOM.render(<App />, document.getElementById('root'))
ReactDOM.render(<Head/>, document.getElementsByTagName('head')[0])