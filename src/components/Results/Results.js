import React from 'react';
import { Link } from 'react-router-dom';
import { Paper, Typography } from '@material-ui/core';
import './Results.css';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.result = null;
  }

  render() {
    this.result = (result) => (
      <Paper elevation={4} className='grid-element' key={result.id}>

        {result.poster_path || result.profile_path ?
          (<img src={`https://image.tmdb.org/t/p/w500/${result.poster_path ? result.poster_path : result.profile_path}`} alt={`poster of movie ${result.title}`} />) :
          'Image not available'
        }

        <div className='grid-content'>
          {result.original_name || result.title ?
            (<Typography variant="subheading" component="h3" className='title' >
              <Link to={{
                pathname: '/movie/details',
                search: `id=${result.id}${result.media_type ? (`&media=${result.media_type}`) : ''}`
              }}
                id={result.id}>{result.title ? result.title : result.original_name}</Link>
            </Typography>) :
            null
          }

          {result.vote_average ?
            (<Typography variant='caption'>
              <b>Stars</b>: {result.vote_average}
            </Typography>) :
            null
          }

          {result.original_language ?
            (<Typography variant='caption'>
              <b>Language</b>: {result.original_language}
            </Typography>) :
            null
          }

          {result.release_date ?
            (<Typography variant='caption'>
              <b>Release Date</b>: {result.release_date}
            </Typography>) :
            null
          }

          {result.profile_path ?
            <div className="person">
              {result.name ?
                <Typography variant="subheading" component="h3" className='title'>
                  <Link
                    to={{
                      pathname: '/person/details',
                      search: `id=${result.id}&type=${result.media_type}`
                    }}
                  >{result.name}</Link></Typography> :
                null
              }

              {result.popularity ?
                <Typography variant='caption'>
                  <p><b>Popularity</b>: {result.popularity}</p>
                </Typography> :
                null
              }

              {result.known_for ?
                <Typography variant='caption'>
                  <p><b>Known For</b>: {result.known_for.map((name, value, all) => (
                    (all.length - 1 === value ?
                      (name.title || name.original_name ? `${name.title}` : `${name.original_name}`) :
                      (name.title || name.original_name ? `${name.title}, ` : `${name.original_name}, `)
                    )))}</p>
                </Typography> :
                null
              }

            </div> :
            null
          }

        </div>
      </Paper>
    );

    return (
      <div className='grid'>
        {
          this.props.results ?
            (
              this.props.results.map(result => (result.poster_path || result.profile_path ? this.result(result) : null))
            ) :
            (
              this.props.popular.map(result => (result.poster_path || result.profile_path ? this.result(result) : null))
            )
        }
      </div>
    );
  }
}

export default Results;