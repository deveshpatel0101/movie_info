import React from 'react';
import './Person.css';
import { LinearProgress, Card } from '@material-ui/core';
import { getById } from '../../controllers/querySearch';

class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      image: null
    }
  }

  componentWillMount() {
    let id = window.location.search.split('=');
    id = id[1].split('&')[0];
    getById(id, 'person').then(res => {
      let images = res.images.profiles.splice(0, 30);
      this.setState(() => ({ result: res.response, images: images }));
      console.log(res)
    });
  }

  render() {
    return (
      (this.state.result ?
        (
          <div className='details'>
            <img className='poster' src={`https://image.tmdb.org/t/p/w500/${this.state.result.profile_path}`} alt={`Poster of the ${this.state.result.title}`} />
            <div className='details-content'>

              {this.state.result.name ?
                <p><b>Name</b>: {this.state.result.name}</p> :
                null
              }

              {this.state.result.birthday ?
                <p><b>Born on</b>: {this.state.result.birthday}</p> :
                null
              }

              {this.state.result.place_of_birth ?
                <p><b>Birth Place</b>: {this.state.result.place_of_birth}</p> :
                null
              }

              {this.state.result.deathday ?
                <p><b>Died on</b>: {this.state.result.deathday}</p> :
                null
              }

              {this.state.result.homepage ?
                <p><b>Home Page</b>: <a href={`${this.state.result.homepage}`} target='_blank'>Home Page</a></p> :
                null
              }          

              {this.state.result.biography ?
                <div>
                  <p><b>Biography</b>: </p>
                  <p>{this.state.result.biography}</p>
                </div> :
                null
              }

            </div>
            {this.state.images ?
              <div className='images-grid'>
                {this.state.images.map((image, value) => (
                  <Card key={value} className='images-grid-content'>
                    <img src={`https://image.tmdb.org/t/p/w500/${image.file_path}`} alt='' key={value} />
                  </Card>
                ))}
              </div> :
              null
            }

          </div>
        ) :
        <LinearProgress />)
    )
  }
}

export default Person;