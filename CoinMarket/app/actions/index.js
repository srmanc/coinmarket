export const DATA_AVAILABLE = 'DATA_AVAILABLE';
export const SELECT_DATA = 'SELECT_DATA';
export const SET_LOADING = 'SET_LOADING';
const COIN_MARKET_API_URL = 'https://api.coinmarketcap.com/v1/ticker/?start=0&limit=100&convert='

export function getData(currency,selectedId) {
  return (dispatch) => {
    dispatch({type: SET_LOADING, loading: true});
    fetch(COIN_MARKET_API_URL + currency)
	.then(response => response.json())
	.then(responseJson => {
	  var data = responseJson;
	  dispatch({type: DATA_AVAILABLE, data:data, selectedId:selectedId, currency:currency});
	});				
  };
}

export function getSelectedData(selectedId) {
  return (dispatch) => {
    dispatch({type: SELECT_DATA, selectedId:selectedId});
  };
}