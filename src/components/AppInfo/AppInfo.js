import React from 'react';
import './AppInfo.css';
import { Popover } from '@material-ui/core';
import { FavoriteBorder } from '@material-ui/icons';

class AppInfo extends React.Component {
  render() {
    return (
      <Popover
        open={this.props.open}
        onClose={this.props.handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <div className='popover-content'>
          Made with{' '}
          <span>
            <FavoriteBorder className='favorite' />
          </span>
          <span> by Devesh</span>.
          <div>For more similar apps visit <a href="https://deveshpatel.herokuapp.com/about#featured-work">My Apps</a>.</div>
        </div>
      </Popover>
    );
  }
}

export default AppInfo;
