import React from 'react'
import ReactDOM from 'react-dom'
import { createStore,applyMiddleware} from './woniu-redux'
import thunk from './woniu-redux-thunk'
import arrThunk from './woniu-redux-array'
import { counter } from './index.redux'
import { Provider } from './woniu-react-redux';
import App from './App'
import Demo from'./demo2'

//const store = createStore(counter,applyMiddleware(thunk,arrThunk))
ReactDOM.render(
  (
    // <Provider store={store}>
    //   <App />
    // </Provider>
    <Demo></Demo>
  ),
  document.getElementById('root'))





