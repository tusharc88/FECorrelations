import React from 'react';
import { hot } from 'react-hot-loader';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AutocompleteField from './components/AutocompleteField/index';

const Root = () => (
  <div>
    <MuiThemeProvider>
      <AutocompleteField />
    </MuiThemeProvider>
  </div>
);

export default hot(module)(Root);
