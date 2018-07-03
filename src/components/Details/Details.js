import React from 'react';
import './Details.css';
import { LinearProgress, Card } from '@material-ui/core';
import { getById } from '../../controllers/querySearch';

class Details extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null
    }
  }

  componentWillMount() {
    let id = window.location.search.split('=');
    let type;
    if (id[2]) {
      type = id[2];
    } else {
      type = 'movie';
    }
    id = id[1].split('&')[0];
    getById(id, type).then(res => {
      let images = [];
      if (type === 'person') {
        images = res.images.profiles.splice(0, 20);
      } else {
        images = res.images.backdrops.concat(res.images.posters);
        images = images.splice(0, 20);
      }
      this.setState(() => ({ result: res.response, images: images }));
    });
  }

  render() {
    return (
      this.state.result ?
        (
          <div className='details'>
            <img src={`https://image.tmdb.org/t/p/w500/${this.state.result.poster_path || this.state.result.profile_path}`} alt={`Poster of the ${this.state.result.title}`} />
            <div className='details-content'>

              {this.state.result.title || this.state.result.orginal_name ?
                <p><b>Title</b>: {this.state.result.title ? this.state.result.title : this.state.result.orginal_name}</p> :
                null
              }

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

              {this.state.result.status ?
                <p><b>Status</b>: {this.state.result.status}</p> :
                null
              }

              {this.state.result.vote_average ?
                <p><b>Stars</b>: {this.state.result.vote_average}</p> :
                null
              }

              {this.state.result.genres ?
                <p><b>Genres</b>: {this.state.result.genres.map((genre, value, all) => (
                  value === all.length - 1 ? `${genre.name}` : `${genre.name}, `
                ))}
                </p> :
                null
              }

              {this.state.result.runtime ?
                <p><b>Runtime</b>: {this.state.result.runtime} mins</p> :
                null
              }

              {this.state.result.spoken_language ?
                <p><b>Language</b>: {this.state.result.spoken_language.map((lang) => (
                  `${lang.name} `
                ))}</p> :
                null
              }

              {this.state.result.release_date ?
                <p><b>Release Date</b>: {this.state.result.release_date}</p> :
                null
              }

              {this.state.result.revenue ?
                <p><b>Revenue</b>: {this.state.result.revenue}</p> :
                null
              }

              {this.state.result.popularity ?
                <p><b>Popularity</b>: {this.state.result.popularity}</p> :
                null
              }

              {this.state.result.origin_country ?
                <p><b>Country</b>: {this.state.result.origin_country}</p> :
                null
              }

              {this.state.result.first_air_date ?
                <p><b>First Released On</b>: {this.state.result.first_air_date}</p> :
                null
              }

              {this.state.result.number_of_seasons ?
                <p><b>Total Seasons</b>: {this.state.result.number_of_seasons}</p> :
                null
              }

              {this.state.result.last_air_date ?
                <p><b>Last episode released on</b>: {this.state.result.last_air_date}</p> :
                null
              }

              {this.state.result.number_of_episodes ?
                <p><b>Total Episodes</b>: {this.state.result.number_of_episodes}</p> :
                null
              }

              {this.state.result.overview ?
                <div>
                  <p><b>Overview</b>: </p>
                  <p>{this.state.result.overview}</p>
                </div> :
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
        <LinearProgress />
    )
  }
}

export default Details;