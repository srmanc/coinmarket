import React from 'react';
import App from './App';
import Home from './app/components/home';
import CoinInfo from './app/components/coin';
import Settings from './app/components/settings';
import Store from './app/store';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

it('renders without crashing', () => {
  const rendered = renderer.create(<App />).toJSON();
  expect(rendered).toBeTruthy();
});

it('also renders without crashing', () => {
  const rendered = renderer.create(
    <Provider store={Store}>
      <Home />
    </Provider>
  ).toJSON();
  expect(rendered).toBeTruthy();
});

it('truly renders without crashing', () => {
  const rendered = renderer.create(
    <Provider store={Store}>
      <CoinInfo />
    </Provider>
  ).toJSON();
  expect(rendered).toBeTruthy();
});