import {
  SIDE_MENU_BLOCK_INFO_START,
  SIDE_MENU_BLOCK_INFO_SUCCESS,
  SIDE_MENU_BLOCK_INFO_ERROR
  } from '../constants';
  
  export default function sideMenu(state = {}, action) {
    switch (action.type) {
  
      case SIDE_MENU_BLOCK_INFO_START:
        return {
          ...state,
        };
        
      case SIDE_MENU_BLOCK_INFO_SUCCESS:
        return {
          ...state,
          data: action.payload.sideMenu,
        };
  
      case SIDE_MENU_BLOCK_INFO_ERROR:
        return {
          ...state,
        };
  
      default:
        return state;
    }
  }