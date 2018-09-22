import React from 'react';
import { Link } from 'react-router-dom';
import './Person.css';
import { LinearProgress } from '@material-ui/core';
import { getById } from '../../controllers/querySearch';

class Person extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      result: null,
      images: null,
      movieCredits: null,
      tvCredits: null,
      selection: 'photos'
    }
    this.handleClick = this.handleClick.bind(this)
  }

  componentWillMount() {
    let id = window.location.search.split('=');
    id = id[1].split('&')[0];
    getById(id, 'person').then(res => {
      let images = res.images.profiles.splice(0, 30);
      this.setState(() => ({ result: res.response, images: images, movieCredits: res.movie_credits, tvCredits: res.tv_credits }));
      console.log(res)
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

            <div className='navbar'>
              <div onClick={this.handleClick}>Photos</div>
              <div onClick={this.handleClick}>Filmography</div>
            </div>

            {this.state.images && this.state.selection === 'photos' ?
              <div className='images-grid'>
                {this.state.images.map((image, value) => (
                  <div key={value} className='images-grid-content'>
                    <img src={`https://image.tmdb.org/t/p/w500/${image.file_path}`} alt='' key={value} />
                  </div>
                ))}
              </div> :
              null
            }

            {this.state.movieCredits && this.state.movieCredits.cast.length > 0 && this.state.selection === 'filmography' ?
              (
                <div className='filmography'>
                  {this.state.movieCredits.cast.map((movie, value) => (
                    movie.poster_path ? 
                    (<div className='filmography-card' key={value}>
                      <div className='filmography-card-post'>
                        <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={`Poster of ${movie.original_title} movie`} />
                      </div>
                      <div className='filmography-card-content'>
                        <Link to={{ pathname: '/movie/details', search: `id=${movie.id}&type=movie` }}>{movie.original_title} - ({movie.release_date.split('-')[0]})</Link>
                      </div>
                    </div>) : null
                  ))}
                </div>
              ) :
              null
            }

          </div>
        ) :
        <LinearProgress />)
    )
  }
}

export default Person;