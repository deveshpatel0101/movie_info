import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import './Form.css';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: this.props.adult,
      radio: 'movie'
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const temp = e.target.checked;
    this.setState(() => ({ checked: temp }));
    this.props.handleData(temp);
  }

  render() {
    return (
      <div className='form'>
        <div>
          <FormControlLabel
            control={
              <Checkbox value='checkedE'
                checked={this.state.checked}
                onChange={this.handleChange}
                color='default'
              />}
            label='Enable adult content'
          />
        </div>
      </div>
    )
  }
}

export default Form;