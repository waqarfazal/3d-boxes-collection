import listsReducer from "./listsReducer";
import boxSelectionReducer from './boxSelectionReducer';
import { combineReducers } from "redux";
const rootReducer = combineReducers({
  listsData: listsReducer,
  boxSelectionData: boxSelectionReducer,
});

export default rootReducer;
