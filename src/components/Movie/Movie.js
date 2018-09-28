import React from 'react';
import { Link } from 'react-router-dom'
import './Movie.css';
import { LinearProgress } from '@material-ui/core';
import { getById } from '../../controllers/querySearch';

class Movie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      cast: null,
      crew: null,
      selection: 'cast'
    }
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillMount() {
    let id = window.location.search.split('=');
    id = id[1].split('&')[0];
    getById(id, 'movie').then(res => {
      this.setState(() => ({ result: res.response, cast: res.cast, crew: res.crew }));
    });
  }

  handleClick(e) {
    const temp = e.target.innerHTML.toLowerCase();
    this.setState(() => ({ selection: temp }))
  }

  render() {
    return (
      (this.state.result ?
        (
          <div className='details'>
            <img className='poster' src={`https://image.tmdb.org/t/p/w500/${this.state.result.poster_path}`} alt={`Poster of the ${this.state.result.title}`} />
            <div className='details-content'>

              {this.state.result.title || this.state.result.orginal_name ?
                <p><b>Title</b>: {this.state.result.title ? this.state.result.title : this.state.result.orginal_name}</p> :
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

              {this.state.result.overview ?
                <div>
                  <p><b>Overview</b>: </p>
                  <p>{this.state.result.overview}</p>
                </div> :
                null
              }

            </div>

            <div className='movie-navbar'>
              <div onClick={this.handleClick}>Cast</div>
              <div onClick={this.handleClick}>Crew</div>
            </div>

            {/* Movie cast rendering */}
            {this.state.selection === 'cast' && this.state.cast ?
              <div className='container'>
                <h3>Cast: {this.state.cast.length}</h3>
                <div className='casts-main'>
                  {this.state.cast.map((cast, value) => (
                    <div key={value} className='casts'>

                      <div className='cast-image'>
                        <Link to={{ pathname: '/person/details', search: `id=${cast.id}&type=person` }}>
                          <img height='100px' width='50px' src={`${cast.profile_path ? (`https://image.tmdb.org/t/p/w500/${cast.profile_path}`) : ('/img/person_image_not_found.png')}`} alt='' key={value} />
                        </Link>
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

            {/* Movie crew rendering */}
            {this.state.selection === 'crew' && this.state.crew ?
              <div className='container'>
                <h3>Cast: {this.state.crew.length}</h3>
                <div className='casts-main'>
                  {this.state.crew.map((crew, value) => (
                    <div key={value} className='casts'>

                      <div className='cast-image'>
                        <Link to={{ pathname: '/person/details', search: `id=${crew.id}&type=person` }}>
                          <img height='100px' width='50px' src={`${crew.profile_path ? (`https://image.tmdb.org/t/p/w500/${crew.profile_path}`) : ('/img/person_image_not_found.png')}`} alt='' key={value} />
                        </Link>
                      </div>

                      <div className='cast-details'>
                        <p> <Link to={{ pathname: '/person/details', search: `id=${crew.id}&type=person` }}><strong>{crew.name}</strong></Link><br /><span>{crew.job}</span></p>
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