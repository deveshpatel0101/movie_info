import secrets from '../secrets';

// let results = [];
let url;

export const get = (query, adult, type) => {
    if (!type) {
        url = `https://api.themoviedb.org/3/search/multi?api_key=${secrets.moviedb_api}&language=en-US&query=${query}&page=1&include_adult=${adult}`;
    } else {
        url = `https://api.themoviedb.org/3/movie/popular?api_key=${secrets.moviedb_api}&language=en-US&page=1`;
    }
    console.log('New fetch query is being made....');
    return fetch(url).then(mainResponse => {
        return mainResponse.json();
    }).then(response => {
        return response.results;
    }).then(res => {
        console.log('Response from get ', res);
        return res;
    });
};

export const getById = (id, type) => {
    url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${secrets.moviedb_api}&language=en-US`;
    console.log('New fetch query is being made....');
    return fetch(url).then(mainResponse => {
        return mainResponse.json();
    }).then(response => {
        url = `https://api.themoviedb.org/3/${type}/${id}/images?api_key=${secrets.moviedb_api}`
        return fetch(url).then(mainResponse => {
            return mainResponse.json();
        }).then(res => {
            return {response: response, images: res};
        });
    }).then(res => {
        console.log('Response from getById ', res);
        return res;
    });
};