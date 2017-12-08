export const DATA_AVAILABLE = 'DATA_AVAILABLE';
export const SELECTED_DATA_AVAILABLE = 'SELECTED_DATA_AVAILABLE';
 
export function getData(currency){
    return (dispatch) => {
        fetch('https://api.coinmarketcap.com/v1/ticker/?start=0&limit=100&convert='+currency)
		.then(response => response.json())
		.then(responseJson => {
			var data = responseJson;
			dispatch({type: DATA_AVAILABLE, data:data, currency:currency});
		});				
    };
}

export function getSelectedData(rank,currency){
	return (dispatch) => {
		fetch('https://api.coinmarketcap.com/v1/ticker/?start='+rank+'&limit=1&convert='+currency)
		.then(response => response.json())
		.then(responseJson => {
			var selectedData = responseJson[0];
			dispatch({type: SELECTED_DATA_AVAILABLE, data:selectedData, currency:currency});
		})
	}
}

export function changeCurrency(currency) {
	return (dispatch) => {
		dispatch({currency:currency});
	}
}