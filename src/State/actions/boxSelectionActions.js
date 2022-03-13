export const ADD_BOX = 'ADD_BOX';
export const ADD_MULTIPLE_BOXES = "ADD_MULTIPLE_BOXES";
export const REMOVE_BOX = 'REMOVE_BOX';
export const REMOVE_ALL_BOXES = 'REMOVE_ALL_BOXES';
export const addBox = (id) =>{
    return {
      type: 'ADD_BOX',
      id,
    }
}
export const addMultipleBoxes = (data) => {
  return {
    type: 'ADD_MULTIPLE_BOXES',
    data
  }
}
export const removeBox = (id) =>{
    return {
      type: 'REMOVE_BOX',
      id,
    }
}

export const removeAllBoxes = () => {
  return {
    type: "REMOVE_ALL_BOXES"
  }
}