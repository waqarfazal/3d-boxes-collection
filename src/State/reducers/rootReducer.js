import listsReducer from "./listsReducer";
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  listsData: listsReducer,
});

export default rootReducer;
