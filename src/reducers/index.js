import { userReducer } from "./userReducers";
import { connectionReducer } from "./connectionReducer";
import { combineReducers } from "redux";

export default combineReducers({
  user: userReducer,
  connection: connectionReducer
});