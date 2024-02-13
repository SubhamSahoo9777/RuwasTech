import {combineReducers} from 'redux'
import UserReducer from "./UserReducer"


import ModalActivityReducer from './ModalActivityReducer'


const CombineAllReducer=combineReducers({
    UserReducer,
    ModalActivityReducer,
  
})
export default CombineAllReducer
