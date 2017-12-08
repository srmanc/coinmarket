import { combineReducers } from 'redux';
 
import { DATA_AVAILABLE, SELECTED_DATA_AVAILABLE } from "../actions/"
import { SINGLE_DATA_AVAILABLE } from "../actions"
 
let dataState = { data: [], loading:true, currency:'USD' };
 
const dataReducer = (state = dataState, action) => {
    switch (action.type) {
        case DATA_AVAILABLE:
            console.log('DATA_AVAILABLE');
            state = Object.assign({}, state, { data: action.data, loading:false, currency: action.currency });
            return state;
        case SELECTED_DATA_AVAILABLE:
            console.log('SELECTED_DATA_AVAILABLE');
            state = Object.assign({}, state, { selectedData: action.data, loading:false, currency: action.currency });
            return state;
        default:
            return state;
    }
};
 
// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})
 
export default rootReducer;