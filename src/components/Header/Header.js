import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Input, LinearProgress, Button } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import './Header.css';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: ''
    }
    this.setQuery = this.setQuery.bind(this);
    this.handleBack = this.handleBack.bind(this);
  }

  setQuery(e) {
    const temp = e.target.value;
    this.props.setQuery(temp);
    this.setState(() => ({ query: temp }));
  }

  handleBack() {
    this.props.setQuery('');
    this.setState(() => ({ query: '' }));
  }

  render() {
    return (
      <div className="header">
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit" className='project-name'>
              <Link to="/">
                {this.props.showBack ? //show back button if on the details page
                  <Button
                    size="small">
                    <KeyboardArrowLeft />
                    Back
                  </Button> :
                  <span onClick={this.handleBack}>Movie Search</span>
                }
              </Link>
            </Typography>
            {this.props.showBack ?
              null :
              (<div className='search'>
                <Input
                  placeholder="Search"
                  className='search-input'
                  onChange={this.setQuery}
                  value={this.state.query}
                />
              </div>)
            }
          </Toolbar>
        </AppBar>
        {this.props.progressBar ? <LinearProgress /> : null}
      </div>
    );
  }
}

export default Header;
