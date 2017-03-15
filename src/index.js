import React from 'react'
import {render} from 'react-dom'

const app = document.querySelector('#app')
render(
  <div>Hello World</div>,
  app
)

if (module.hot) { module.hot.accept() }
