import React, { Component, Fragment } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { get } from './controllers/querySearch';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button';
import './App.css';
import Header from './components/Header/Header';
import Results from './components/Results/Results';
import Movie from './components/Movie/Movie';
import Person from './components/Person/Person';
import Form from './components/Form/Form';
import Television from './components/Television/Television';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      results: null,
      popular: null,
      adult: false,
      scrollPosition: []
    }
    this.setQuery = this.setQuery.bind(this);
    this.handleData = this.handleData.bind(this);
    this.setScrollPosition = this.setScrollPosition.bind(this);
    this.getScrollPosition = this.getScrollPosition.bind(this);
  }

  //passed as props to header component. will be called when new search query is made
  setQuery(query) {
    this.setState(() => ({ query }));
    if (query !== '') {
      get(query, this.state.adult, false).then(res => {
        this.setState(() => ({ results: res }));
      });
    }
  }

  //sets adult boolean value to state
  handleData(data) {
    this.setState(() => ({ adult: data }));
  }

  //make first call when component is going to mount for popular movies.
  componentWillMount() {
    get(null, this.state.adult, true).then(res => {
      this.setState(() => ({ popular: res }));
    });
  }

  setScrollPosition(path, scroll) {
    this.setState((prevState) => ({ scrollPosition: prevState.scrollPosition.concat({path, scroll}) }));
  }

  getScrollPosition(path) {
    let temp = this.state.scrollPosition;
    if (temp.length > 0 && temp[temp.length - 1].path === path) {
      window.scrollTo(0, temp[temp.length - 1].scroll);
      this.setState((prevState) => ({scrollPosition: prevState.scrollPosition.slice(0, prevState.scrollPosition.length - 1)}))
    }
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter basename={window.location.host === 'deveshpatel.herokuapp.com' || window.location.host === 'deveshpatel-staging.herokuapp.com' ? '/featured_works/movie_info' : '/'}>
          <Switch>

            {/* Home page route */}
            <Route
              path='/'
              render={() => (
                <Fragment>
                  <Header setQuery={this.setQuery} porgressBar={this.state.popular} />
                  <Form handleData={this.handleData} adult={this.state.adult} />
                  {this.state.popular || this.state.results ?
                    (this.state.query !== '' && this.state.results ?
                      (<Results results={this.state.results} />) : //display if query is present
                      (<Results popular={this.state.popular} />) //display popular movies if query is not present
                    ) :
                    null}
                </Fragment>
              )}
              exact={true}
            />

            {/* Route for movie details */}
            <Route path='/movie/details' render={() => (
              <Fragment>
                <Header query={this.state.query} setQuery={this.setQuery} showInput={false} />
                <Movie setScrollPosition={this.setScrollPosition} getScrollPosition={this.getScrollPosition} />
              </Fragment>
            )} />

            {/* Route for person details */}
            <Route path='/person/details' render={() => (
              <Fragment>
                <Header query={this.state.query} setQuery={this.setQuery} showInput={false} />
                <Person setScrollPosition={this.setScrollPosition} getScrollPosition={this.getScrollPosition} />
              </Fragment>
            )} />

            {/* Route for tv details */}
            <Route path='/tv/details' render={() => (
              <Fragment>
                <Header query={this.state.query} setQuery={this.setQuery} showInput={false} />
                <Television setScrollPosition={this.setScrollPosition} getScrollPosition={this.getScrollPosition} />
              </Fragment>
            )} />

          </Switch>
        </BrowserRouter>
        <div className='goto-top'>
          <Button variant="fab" color="primary" aria-label="Goto Top" onClick={() => (window.scrollTo(0, 0))}>
            <ExpandMoreIcon />
          </Button>
        </div>
      </div>
    );
  }
}

export default App;