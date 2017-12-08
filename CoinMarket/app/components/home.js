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
 
class Home extends Component {
	constructor(props) {
        super(props);
 
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            ds: ds
        };
    }
 
    componentDidMount() {
        this.props.getData(this.props.currency); //call our action	
    }
 
    render() {
        if (this.props.loading) {
            return (
                <View style={styles.activityIndicatorContainer}>
                    <ActivityIndicator animating={true} size="large" />
                </View>
            );
        } else {
			return (
                <View style={{flex:1, backgroundColor: '#F5F5F5'}}>
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
		  <TouchableHighlight onPress={() => this.props.onPress(rowID)}>
		    <View style={styles.row}>
                <Text style={styles.title}>
                    {rowData.rank}{". "}{rowData.symbol}
                </Text>
                <Text style={styles.description}>
                    {price}{" "}{this.props.currency.toUpperCase()}
                </Text>
				<Text style={styles.description}>
                    {"Changed last 24 h: "}{rowData.percent_change_24h}{"%"}
                </Text>
            </View>	
		  </TouchableHighlight>	
        )
    }
};
 
// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
function mapStateToProps(state, props) {
    return {
        loading: state.dataReducer.loading,
        data: state.dataReducer.data,
		currency: state.dataReducer.currency
    }
}
 
// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
function mapDispatchToProps(dispatch) {
    return bindActionCreators(Actions, dispatch);
}
 
//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(Home);
 
var styles = StyleSheet.create({
    activityIndicatorContainer:{
        backgroundColor: "#fff",
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
 
    row:{
        borderBottomWidth: 1,
        borderColor: "#ccc",
        // height: 50,
        padding: 10
    },
 
    title:{
        fontSize: 15,
        fontWeight: "600"
    },
 
    description:{
        marginTop: 5,
        fontSize: 14,
    }
});