import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import axios from 'axios';

export default class AutocompleteField extends Component {
  state = {
    values: [],
    tickers: [],
    correlations: [],
    selectedTickers: [],
  };

  componentDidMount() {
    this.fetchTickers();
  }

  fetchTickers = async () => {
    const response = await axios.get(
      'http://k-fe-practical.herokuapp.com/api/tickers/'
    );

    // console.log(`response ${JSON.stringify(response)}`);
    this.setState(prevState => ({
      ...prevState,
      tickers: [...response.data.tickers],
    }));
  };

  handleChange = (event, index, values) => {
    this.setState(prevState => ({ ...prevState, values: [...values] }));
    this.fetchSpecificTickers(this.createQueryURLString(values));
  };

  fetchSpecificTickers = async url => {
    // console.log(`url: ${url}`);
    const resp = await axios.get(url);
    console.log(
      `resp: ${JSON.stringify(
        resp.data.correlations.filter(data => data.value !== 1)
      )}`
    );
    this.setState(prevState => ({
      ...prevState,
      correlations: [
        ...resp.data.correlations.filter(data => data.value !== 1),
      ],
      selectedTickers: [...resp.data.tickers],
    }));
  };

  createQueryURLString = values => {
    const initialURL = 'http://k-fe-practical.herokuapp.com/api/correlation/?';
    const finalURL = values.reduce(
      (url, val) => `${url}tickers=${val}&`,
      initialURL
    );
    return finalURL.substring(0, finalURL.length - 1);
  };

  menuItems(values) {
    return this.state.tickers.map(name => (
      <MenuItem
        key={name}
        insetChildren
        checked={values && values.indexOf(name) > -1}
        value={name}
        primaryText={name}
      />
    ));
  }

  render() {
    const { values, correlations, selectedTickers } = this.state;
    return (
      <div>
        <SelectField
          multiple
          hintText="Select a name"
          value={values}
          onChange={this.handleChange}
        >
          {this.menuItems(values)}
        </SelectField>
        <div>
          <div>
            Tickers:
            <span>
              {selectedTickers.reduce(
                (concatVal, val) => `${concatVal} ${val}`,
                ''
              )}
            </span>
          </div>
          {correlations.map((data, i) => (
            <div key={() => `${data.pair[0]}-${data.pair[1]}-${i}`}>
              <span>{`${data.pair[0]}, ${data.pair[1]}`}</span>
              <span>Correlation Value: {data.value}</span>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
