import React from 'react';
import { FormControlLabel, Checkbox } from '@material-ui/core';
import './Form.css';


class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
      radio: 'movie'
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleRadio = this.handleRadio.bind(this);
  }

  handleChange(e) {
    const temp = e.target.checked;
    this.setState(() => ({ checked: temp }));
    this.props.handleData(temp, 'adult');
  }

  handleRadio(e) {
    const temp = e.target.value;
    this.setState(() => ({ radio: temp }));
    this.props.handleData(temp, 'search-type');
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

        {/* <Typography variant="subheading" gutterBottom className='search-by'>Search By: </Typography>
        <div className='radio-button'>
          Movie: <Radio value="movie" color="primary" label="Movie" checked={this.state.radio === 'movie'} onChange={this.handleRadio} />
          People: <Radio value="people" color="primary" label="People" checked={this.state.radio === 'people'} onChange={this.handleRadio} />
        </div> */}

      </div>
    )
  }
}

export default Form;