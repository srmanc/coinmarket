import { combineReducers } from 'redux';
 
import { DATA_AVAILABLE, SELECT_DATA, SET_LOADING } from "../actions/"
 
let dataState = { data: [], selectedId: undefined, selectedData: {}, loading:true, currency:'USD' };
 
const dataSelector = (data,selectedId) => {
  var selectedData = {};
  for (var i = 0; i < data.length; i++)
    if (data[i].id == selectedId) {
      selectedData = data[i];
      break;
    }
  return selectedData;
};

const dataReducer = (state = dataState, action) => {
  switch (action.type) {
    case DATA_AVAILABLE:
      var selectedData = dataSelector(action.data, state.selectedId);
      console.log(selectedData);
      state = Object.assign({}, state, { data: action.data, selectedId: action.selectedId, selectedData: selectedData, loading:false, currency: action.currency });
      return state;
    case SELECT_DATA:
      var selectedData = dataSelector(state.data, action.selectedId);
      state = Object.assign({}, state, { selectedId: action.selectedId, selectedData: selectedData });
      return state;
    case SET_LOADING:
      state = Object.assign({}, state, { loading: action.loading });
      return state;
    default:
      return state;
  }
};
 
// Combine all the reducers
const rootReducer = combineReducers({
  dataReducer    
})
 
export default rootReducer;