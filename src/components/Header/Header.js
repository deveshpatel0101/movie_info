import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Input, LinearProgress, IconButton } from '@material-ui/core';
import { ErrorOutline } from '@material-ui/icons';
import AppInfo from '../AppInfo/AppInfo';

import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      open: false,
    };
  }

  setQuery = (e) => {
    const temp = e.target.value;
    this.setState(() => ({ query: temp }));
    this.props.setQuery(temp);
  };

  handleBack = () => {
    this.props.setQuery('');
    this.setState(() => ({ query: '' }));
  };

  handleInfoClick = () => {
    this.setState((prevState) => ({ open: !prevState.open }));
  };

  render() {
    return (
      <div className='header'>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='title' color='inherit' className='project-name'>
              <Link to='/'>
                <span onClick={this.handleBack}>Movie Search</span>
              </Link>
            </Typography>

            {this.props.showInput === false ? null : (
              <div className='search'>
                <Input
                  placeholder='Search'
                  className='search-input'
                  onChange={this.setQuery}
                  value={this.state.query}
                />
              </div>
            )}

            <div className={this.props.showInput ? 'app-info-after-input' : 'app-info-left'}>
              <IconButton aria-label='App Info' size='small' onClick={this.handleInfoClick}>
                <ErrorOutline />
              </IconButton>
            </div>
            <AppInfo open={this.state.open} handleClose={this.handleInfoClick} />
          </Toolbar>
        </AppBar>
        {this.props.progressBar ? <LinearProgress /> : null}
      </div>
    );
  }
}

export default Header;
