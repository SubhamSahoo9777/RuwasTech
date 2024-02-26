import { combineReducers } from "redux";
import UserReducer from "./UserReducer";

import ModalActivityReducer from "./ModalActivityReducer";
import UserdetailsReducer from "./userDetailsReducer";
import { TotalCalculationreducer } from "./TableCalculationreducer";
import { LocationReducer } from "./LocationReduser";

TotalCalculationreducer;
const CombineAllReducer = combineReducers({
  UserReducer,
  ModalActivityReducer,
  UserdetailsReducer,
  TotalCalculationreducer,
  LocationReducer,
});
export default CombineAllReducer;
