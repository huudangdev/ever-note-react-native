import thunk from 'redux-thunk'
import { applyMiddleware, createStore, compose } from 'redux'

import rootReducer from './rootReducer'

const enhancer = compose(applyMiddleware(thunk))

export default createStore(rootReducer, applyMiddleware(thunk))
