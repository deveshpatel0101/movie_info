## Movie Info

### Contents
1. Instructions
2. Dependencies
3. Details

### Instructions
To get started with this project follow below steps
1. Clone or download this repo.
2. Run `npm install` to start installing required dependencies.
3. While necessary dependencies are being installed, issue your api key from [The Movie](https://www.themoviedb.org/) and replace this key in `secrets.js` file located in `/src` folder.

```
const secrets = {
  moviedb_api: 'YOUR_API_KEY_HERE'
}

export default secrets;
```
4. Now we have everything needed just run `npm start` and a new tab will automatically open in your default browser. In case if it doesn't the server will be started on `localhost:3000`

### Dependencies
1. React 
2. The MovieDB API
3. React-router-dom
4. Material UI

Note: This project was started from scratch by using `create-react-app`

### Details
This project was made for movie lovers and who loves to know latest information about movies and peoples. You can know more about movie by clicking the title of movie.
You can search for movie or people and result will be displayed instantly.


Happy Learning Happy Coding