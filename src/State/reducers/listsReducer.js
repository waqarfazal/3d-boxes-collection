import {
  ADD_LIST,
  UPDATE_LIST,
  DELETE_LIST
} from "../actions/listsActions";
const initState = [];
const listsReducer = (state=initState, action) => {
    switch (action.type) {
      case ADD_LIST:
        return [
          ...state,
          action.data
        ];
      case UPDATE_LIST:
        return state.map(item =>
          item.id === action.data.id
            ? { ...item, boxes: action.data.boxes, name: action.data.name }
            : item
        );
      case DELETE_LIST:
        const remainingItems = (state) =>
          state.filter(item => item.id !== action.id);
        return remainingItems(state);
        
      default:
        return state;
    }
  };

export default listsReducer;