import { combineReducers } from 'redux'

import reducer from './reducer'

// combine reducers to single state - easy maintain
const rootReducer = combineReducers({ reducer })

export default rootReducer
