import {
  ADMIN_LOAD_LIST_SETTINGS_START,
  ADMIN_LOAD_LIST_SETTINGS_SUCCESS,
  ADMIN_LOAD_LIST_SETTINGS_ERROR
} from '../../constants';

export default function adminListSettingsData(state = {}, action) {
  switch (action.type) {
    case ADMIN_LOAD_LIST_SETTINGS_START:
      return {
        ...state,
        loading: true
      }
    case ADMIN_LOAD_LIST_SETTINGS_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload.adminListSettingsData,
        currentPage: action.payload.currentPage
      };
    case ADMIN_LOAD_LIST_SETTINGS_ERROR:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
