export const ADD_LIST = 'ADD_LIST';
export const UPDATE_LIST = 'UPDATE_LIST';
export const DELETE_LIST = 'DELETE_LIST';
export const addList = (data) =>{
    return {
      type: 'ADD_LIST',
      data, 
    }
  }

export const updateList = (data) =>{
    return {
      type: 'UPDATE_LIST',
      data, 
    }
  }

export const deleteList = (id) =>{
    return {
      type: 'DELETE_LIST',
      id,
    }
  }