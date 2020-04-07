import secrets from '../secrets';

let url;

export const get = (query, adult, popular) => {
  if (!popular) {
    url = `https://api.themoviedb.org/3/search/multi?api_key=${
      secrets.moviedb_api
    }&language=en-US&query=${query}&page=1&include_adult=${adult}`;
  } else {
    url = `https://api.themoviedb.org/3/movie/popular?api_key=${
      secrets.moviedb_api
    }&language=en-US&page=1`;
  }
  return fetch(url)
    .then((mainResponse) => {
      return mainResponse.json();
    })
    .then((response) => {
      return response.results;
    })
    .then((res) => {
      return res;
    });
};

export const getById = (id, type) => {
  url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${secrets.moviedb_api}&language=en-US`;
  return fetch(url)
    .then((mainResponse) => {
      return mainResponse.json();
    })
    .then((response) => {
      url = `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${secrets.moviedb_api}`;
      return fetch(url)
        .then((mainResponse) => {
          return mainResponse.json();
        })
        .then((res) => {
          if (type === 'movie' || type === 'tv') {
            url = `https://api.themoviedb.org/3/${type}/${id}/credits?api_key=${
              secrets.moviedb_api
            }`;
            return fetch(url)
              .then((castMainResponse) => {
                return castMainResponse.json();
              })
              .then((castResponse) => {
                return { response, images: res, cast: castResponse.cast, crew: castResponse.crew };
              });
          }
          return { response, images: res };
        })
        .then((finalResponse) => {
          return finalResponse;
        });
    })
    .then((res) => {
      return res;
    });
};

export const getFilmography = (id) => {
  let url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${
    secrets.moviedb_api
  }&language=en-US`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((movieCredits) => {
      return movieCredits;
    });
};

export const getTv = (id) => {
  let url = `https://api.themoviedb.org/3/person/${id}/tv_credits?api_key=${
    secrets.moviedb_api
  }&language=en-US`;
  return fetch(url)
    .then((response) => {
      return response.json();
    })
    .then((tvCredits) => {
      return tvCredits;
    });
};
