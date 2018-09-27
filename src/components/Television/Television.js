import React from 'react';
import { Link } from 'react-router-dom'
import './Television.css';
import { LinearProgress } from '@material-ui/core';
import { getById } from '../../controllers/querySearch';

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      cast: null,
      crew: null
    }
  }

  componentWillMount() {
    let id = window.location.search.split('=');
    id = id[1].split('&')[0];
    getById(id, 'tv').then(res => {
      console.log(res)
      this.setState(() => ({ result: res.response, cast: res.cast, crew: res.crew }));
    });
  }

  render() {
    return (
      (this.state.result ?
        (
          <div className='details'>
            <img className='poster' src={`https://image.tmdb.org/t/p/w500/${this.state.result.poster_path}`} alt={`Poster of the ${this.state.result.title}`} />
            <div className='details-content'>

              {this.state.result.original_name || this.state.result.name ?
                <p><b>Title</b>: {this.state.result.original_name ? this.state.result.original_name : this.state.result.name}</p> :
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

              {this.state.result.vote_count ?
                <p><b>Vote Count</b>: {this.state.result.vote_count}</p> :
                null
              }

              {this.state.result.genres ?
                <p><b>Genres</b>: {this.state.result.genres.map((genre, value, all) => (
                  value === all.length - 1 ? `${genre.name}` : `${genre.name}, `
                ))}
                </p> :
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

              {this.state.result.popularity ?
                <p><b>Popularity</b>: {this.state.result.popularity}</p> :
                null
              }

              {this.state.result.origin_country ?
                <p><b>Country</b>: {this.state.result.origin_country}</p> :
                null
              }

              {this.state.result.original_language ?
                <p><b>Language</b>: {this.state.result.original_language.toUpperCase()}</p> :
                null
              }

              {this.state.result.first_air_date ?
                <p><b>First Released On</b>: {this.state.result.first_air_date}</p> :
                null
              }

              {this.state.result.last_air_date ?
                <p><b>Last air date</b>: {this.state.result.last_air_date}</p> :
                null
              }

              {this.state.result.next_episode_to_air ?
                <p><b>Next episode to air</b>: {typeof this.state.result.next_episode_to_air === 'object' ? this.state.result.next_episode_to_air.air_date : this.state.result.next_episode_to_air}</p> :
                null
              }

              {this.state.result.number_of_seasons ?
                <p><b>Total Seasons</b>: {this.state.result.number_of_seasons}</p> :
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

            </div>

            {this.state.cast ?
              <div className='container'>
                <h3>Cast: {this.state.cast.length}</h3>
                <div className='casts-main'>
                  {this.state.cast.map((cast, value) => (
                    <div key={value} className='casts'>
                      <div className='cast-image'>
                        <img height='100px' width='50px' src={`${cast.profile_path ? (`https://image.tmdb.org/t/p/w500/${cast.profile_path}`) : ('/img/person_image_not_found.png')}`} alt='' key={value} />
                      </div>
                      <div className='cast-details'>
                        <p> <Link to={{ pathname: '/person/details', search: `id=${cast.id}&type=person` }}><strong>{cast.name}</strong></Link><br /><span>{cast.character}</span></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div> :
              null
            }
          </div>
        ) :
        <LinearProgress />)
    )
  }
}

export default Movie;