import {createStore} from "redux"
import CombineAllReducer from "./CombineAllReducer"
const Store=createStore(CombineAllReducer)
export default Store