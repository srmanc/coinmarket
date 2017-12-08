'use strict';
 
import React, { Component, } from 'react';
import {
  StyleSheet,
  ListView,
  View,
  Text,
  ActivityIndicator,
  Alert,
  TouchableHighlight
} from 'react-native';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions';
import Styles from '../styles';
 
class Home extends Component {
  constructor(props) {
    super(props);
  
    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      ds: ds
    };
  }
 
  componentDidMount() {
    this.props.getData(this.props.currency);
  }
 
  render() {
    if (this.props.loading) {
      return (
        <View style={Styles.progress}>
          <ActivityIndicator animating={true} size="large" />
        </View>
      );
    } else {
      return (
        <View>
          <ListView enableEmptySections={true}
            dataSource={this.state.ds.cloneWithRows(this.props.data)}
            renderRow={this.renderRow.bind(this)} />
        </View>
      );
    }
  }
 
  renderRow(rowData, sectionID, rowID) {
    let price = rowData['price_'+this.props.currency.toLowerCase()];
    return (
	  <TouchableHighlight underlayColor='#ffffff' onPress={() => this.props.onPress(rowData.id)}>
	    <View style={Styles.item}>        
          <Text style={Styles.title}>{rowData.rank + ". " + rowData.symbol}</Text>
          <Text>{price + " " + this.props.currency.toUpperCase()}</Text>
		  <Text>{"Changed last 24 h: " + rowData.percent_change_24h + "%"}</Text>
        </View>	
	  </TouchableHighlight>	
    )
  }
};
 
function mapStateToProps(state, props) {
  return {
    loading: state.dataReducer.loading,
    data: state.dataReducer.data,
    currency: state.dataReducer.currency
  }
}
 
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}
 
export default connect(mapStateToProps, mapDispatchToProps)(Home);