import React from 'react';
import { AppRegistry, Text, Button, Platform } from 'react-native';
import { StackNavigator} from 'react-navigation';
import { Provider } from 'react-redux';
import Store from './app/store'; 
import Home from './app/components/home';
import Settings from './app/components/settings';
import CoinInfo from './app/components/coin';
import Styles from './app/styles';
import Expo from 'expo';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'CoinMarket Top 100',    
    headerRight: <Button title='Settings' onPress={()=>{ navigation.navigate('Settings', { parent: 'HomeScreen' }); }}></Button>,
  });
  render() {
    return (	  
      <Provider store={Store}>
        <Home onPress={(id)=>{ this.props.navigation.navigate('CoinInfo', { id }); }} />
      </Provider>
    );
  }
}

class CoinInfoScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Coin info',
    headerRight: <Button title='Settings' onPress={()=>{ navigation.navigate('Settings', { parent: 'CoinInfoScreen' }); }}></Button>,
  });
  render() {
	  return (
	    <Provider store={Store}><CoinInfo id={ this.props.navigation.state.params.id } /></Provider>
	  );
  }
}

class SettingsScreen extends React.Component {
  static navigationOptions = { title: 'Settings' };
  render() {
    return (
      <Provider store={Store}><Settings parent={ this.props.navigation.state.params.parent } /></Provider>
    );
  }
}

const AppNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  Settings: { screen: SettingsScreen },
  CoinInfo: { screen: CoinInfoScreen }
}, {
  navigationOptions: { headerStyle: { marginTop: Expo.Constants.statusBarHeight } }
});

export default class App extends React.Component {
  render() {
    return <AppNavigator />;
  }
}