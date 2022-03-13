import {
    ADD_BOX,
    REMOVE_BOX,
    REMOVE_ALL_BOXES,
    ADD_MULTIPLE_BOXES
  } from "../actions/boxSelectionActions";
  const initState = [];
  const boxSelectionReducer = (state=initState, action) => {
      switch (action.type) {
        case ADD_BOX:
          return [
            ...state,
            action.id
          ];
        case ADD_MULTIPLE_BOXES:
          return [
            ...state,
            ...action.data
          ];
        case REMOVE_BOX:
          const remainingItems = (state) =>
            state.filter(item => item !== action.id);
          return remainingItems(state);
    
        case REMOVE_ALL_BOXES:
          return []
        default:
          return state;
      }
    };
  
  export default boxSelectionReducer;