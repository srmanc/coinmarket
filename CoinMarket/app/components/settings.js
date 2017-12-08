import React, {Component} from 'react';
import {StatusBar, Text, View, Picker} from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';

class Settings extends Component {  
  constructor(props) {
    super(props);
  }
  
  state = {currency: this.props.currency}  
   
  updateCurrency = (currency) => {
	  this.setState({currency : currency});	  
  }
  
  componentWillUnmount() {	  
    if (this.props.currency.localeCompare(this.state.currency) != 0)
      this.props.getData(this.state.currency);
      //this.props.changeCurrency(this.state.currency);
  }
    
  render() {
	  const currencies = [ 
	    'AUD', 'BRL', 'CAD', 'CHF', 'CLP', 'CNY', 'CZK', 'DKK', 
	    'EUR', 'GBP', 'HKD', 'HUF', 'IDR', 'ILS', 'INR', 'JPY', 
	    'KRW', 'MXN', 'MYR', 'NOK', 'NZD', 'PHP', 'PKR', 'PLN', 
	    'RUB', 'SEK', 'SGD', 'THB', 'TRY', 'TWD', 'USD', 'ZAR'
	  ];
	  var pickerItems = [];
	  for (let i = 0; i < currencies.length; i++)
	    pickerItems.push(<Picker.Item key={i} label={currencies[i].toUpperCase()} value={currencies[i].toUpperCase()} />)      
    return (
	    <View >
        <Text>Select currency:</Text>
		  <Picker
        selectedValue={this.state.currency}
		    onValueChange={this.updateCurrency}>
		    {pickerItems}
      </Picker>
      </View>
    );
  } 
}

function mapStateToProps(state, props) {
    return {
        currency: state.dataReducer.currency
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Settings);