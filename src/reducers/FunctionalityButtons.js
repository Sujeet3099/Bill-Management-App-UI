import {
  ADD_ADD_MODAL,
  REMOVE_ADD_MODAL,
  ADD_EDIT_MODAL,
  REMOVE_EDIT_MODAL,
  ADD_DELETE_MODAL,
  REMOVE_DELETE_MODAL,
  ENABLE_EDIT,
  DISABLE_EDIT,
  ENABLE_DELETE,
  DISABLE_DELETE,
  ENABLE_VIEW_CORRESPONDANCE,
  DISABLE_VIEW_CORRESPONDANCE,
} from './../actions/action';
const initialState = {
  openAdd: false,
  openEdit: false,
  isEdit: true,
  isDelete: true,
  openDelete: false,
  openCorrs: false,
};
export const functionalityReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ADD_MODAL:
      return { ...state, openAdd: true };
    case REMOVE_ADD_MODAL:
      return { ...state, openAdd: false };
    case ADD_EDIT_MODAL:
      return { ...state, openEdit: true };
    case REMOVE_EDIT_MODAL:
      return { ...state, openEdit: false };
    case ADD_DELETE_MODAL:
      // console.log('Added');
      return { ...state, openDelete: true };
    case REMOVE_DELETE_MODAL:
      // console.log('Removed');
      return { ...state, openDelete: false };
    case ENABLE_EDIT:
      return { ...state, isEdit: true };
    case DISABLE_EDIT:
      return { ...state, isEdit: false };
    case ENABLE_DELETE:
      return { ...state, isDelete: true };
    case DISABLE_DELETE:
      return { ...state, isDelete: false };
    case ENABLE_VIEW_CORRESPONDANCE:
      return { ...state, openCorrs: true };
    case DISABLE_VIEW_CORRESPONDANCE:
      return { ...state, openCorrs: false };
    default:
      return state;
  }
};
