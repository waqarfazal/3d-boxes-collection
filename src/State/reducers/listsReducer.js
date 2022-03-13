import {
  ADD_LIST,
  UPDATE_LIST,
  DELETE_LIST
} from "../actions/listsActions";
const initState = [
  {name: "Dummy1"},
  {name: "Dummy2"},
];
const listsReducer = (state=initState, action) => {
    switch (action.type) {
      case ADD_LIST:
        return [
          ...state,
          action.data
        ];
      case UPDATE_LIST:
        return state.map(item =>
          item.name === action.data.name
            ? { ...item, items: action.data.items }
            : item
        );
      case DELETE_LIST:
        const remainingItems = (state) =>
          state.filter(item => item.name !== action.name);
        return remainingItems(state);
        
      default:
        return state;
    }
  };

export default listsReducer;