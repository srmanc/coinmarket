import React, {Component} from 'react';
import {StatusBar, Text, View, ActivityIndicator} from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';

class CoinInfo extends Component {  
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.getSelectedData(this.props.index,this.props.currency);	
  }
  
  render() {
    if (this.props.selectedData == undefined) {
      return (
        <View >
          <ActivityIndicator animating={true} size="large" />
        </View>
      )
    } else {
      return (
        <View >
            <Text>Rank: {this.props.selectedData.rank}</Text>	
            <Text>Name: {this.props.selectedData.name}</Text>	
            <Text>Symbol: {this.props.selectedData.symbol}</Text>
            <Text>Price: {this.props.selectedData['price_'+this.props.currency.toLowerCase()]+' '+this.props.currency.toUpperCase()}</Text>
            <Text>24h volume: {this.props.selectedData['24h_volume_'+this.props.currency.toLowerCase()]+' '+this.props.currency.toUpperCase()}</Text>
            <Text>Market cap: {this.props.selectedData['market_cap_'+this.props.currency.toLowerCase()]+' '+this.props.currency.toUpperCase()}</Text>
            <Text>Price in BTC: {this.props.selectedData.price_btc}</Text>
            <Text>1h change: {this.props.selectedData.percent_change_1h+"%"}</Text>
            <Text>24h change: {this.props.selectedData.percent_change_24h+"%"}</Text>
            <Text>7d change: {this.props.selectedData.percent_change_7d+"%"}</Text>
            <Text>Total supply: {this.props.selectedData.total_supply}</Text>
            <Text>Available supply: {this.props.selectedData.available_supply}</Text>
          </View>
      )
    } 
  }
}

function mapStateToProps(state, props) {
  return {
    loading: state.dataReducer.loading,
    selectedData: state.dataReducer.selectedData,
    currency: state.dataReducer.currency
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}
 
export default connect(mapStateToProps,mapDispatchToProps)(CoinInfo);