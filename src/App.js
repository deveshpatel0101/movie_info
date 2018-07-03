import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { get } from './controllers/querySearch';
import './App.css';
import Header from './components/Header/Header';
import Results from './components/Results/Results';
import Details from './components/Details/Details';
import Form from './components/Form/Form';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: null,
      popular: null,
      adult: false,
      searchType: 'movie'
    }
    this.setQuery = this.setQuery.bind(this);
    this.handleData = this.handleData.bind(this);
  }

//passed as props to header component. will be called when new search query is made
  setQuery(query) {
    if (query !== '') {
      get(query, this.state.adult, false).then(res => {
        this.setState(() => ({ results: res, query: query }));
      });
    } else {
      this.setState(() => ({ query: '' }));
    }
  }

//sets search type and adult values to sate
  handleData(data, type) {
    if (type === 'search-type') {
      this.setState(() => ({ searchType: data }));
    } else {
      this.setState(() => ({ adult: data }));
    }
  }

//make first call when component is going to mount for popular movies.
  componentWillMount() {
    get(null, this.state.adult, true).then(res => {
      this.setState(() => ({ popular: res }));
    });
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter basename={window.location.host === 'deveshpatel.herokuapp.com' ? '/featured_works/movie_info' : '/'}>
          <Switch>
            <Route
              path='/'
              render={() => (
                <Fragment>
                  <Header query={this.state.query} setQuery={this.setQuery} porgressBar={this.state.popular} />
                  <Form handleData={this.handleData} />
                  {this.state.popular || this.state.results ?
                    (this.state.query !== '' ?
                      (<Results results={this.state.results} />) : //display if query is present
                      (<Results popular={this.state.popular} />) //display popular movies if query is not present
                    ) :
                    null}
                </Fragment>
              )}
              exact={true}
            />

            <Route path='/details' render={() => (
              <Fragment>
                <Header query={this.state.query} setQuery={this.setQuery} showBack={true} />
                <Details />
              </Fragment>
            )} />

          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;