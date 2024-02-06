// 6488021 Russarin Eaimrittikrai Section 2
import './App.css';
import './decor.css';
import styled from 'styled-components';
import React, { useState } from 'react';
// Decorate Header
const Head = styled.h1`
    text-align: center;
    font-size: 20px;
`;
// Decorate search form
const Myform = styled.form`
    text-align: center;
    font-size: 20px;
    background-color: #CCCCFF;
    padding: 20px;
    margin-top: 50px;
    margin-left: 80px;
    margin-right: 80px;
    border-radius: 50px;
    border: 0;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
`;

function App() {
  // Initialize constant and set state each constant
  const [title, setTitle] = useState('');
  const [region, setRegion] = useState('');
  const [year, setYear] = useState('');
  const [results, setResults] = useState([]);

  // Handle onChange of each search input
  const titleHandler = (event) => {
    setTitle(event.target.value);
  }
  const regionHandler = (event) => {
    setRegion(event.target.value);
  }
  const yearHandler = (event) => {
    setYear(event.target.value);
  }

  // Search function to fetch from url
  const search = (event) => {
    event.preventDefault();
    // Based URL
    // API Source: https://developers.themoviedb.org/3/search/search-movies
    let url = `https://api.themoviedb.org/3/search/movie?api_key=0f68320a44f3e06284e54484c88c0593&language=en-US&page=1&include_adult=false&`;
    // Parameter of each critiria
    let params = [];
    // Movie's title (required)
    // If title isn't empty
    if (title !== '') {
      params.push(`query=${title}`);
    }
    // Movie's region (optional)
    // If region isn't empty
    if (region !== '') {
      params.push(`region=${region}`);
    }
    // Movie's year related (optional)
    // If year isn't empty
    if (year !== '') {
      params.push(`year=${year}`);
    }
    // Join each parameter with &
    let searchUrl = url + params.join('&');
    // console.log(searchUrl)
    fetch(searchUrl)
      .then(response => response.json())
      .then(data => setResults(data.results))
  }
  return (
    <body>
      {/* Google Family Font */}
      <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Nunito"></link>
      {/* Page Header */}
      <div className="Head">
        <img id ="iconMovie"src="https://cdn-icons-png.flaticon.com/512/3658/3658959.png" alt="movie icon"></img>
        <Head><h1>Movie Search</h1></Head>
      </div>
      {/* Search From */}
      <div className="searchBox">
        <form ><Myform>
          {/* For title */}
          <label> Movie Title </label>
          <br></br>
          <input type="text" id="title" placeholder='Search by Title' value={title} onChange={titleHandler}></input>
          <br></br>
          {/* For region */}
          <label> Region </label>
          <br></br>
          <input type="text" id="rating" placeholder='Region code... (EX: TH, JP, US)' pattern="[A-Z]{2}" value={region} onChange={regionHandler}></input>
          <br></br>
          {/* For year */}
          <label> Year </label>
          <br></br>
          <input type="text" id="year" placeholder="Year... " value={year} onChange={yearHandler} ></input>
          <br></br>
          {/* Submit button will fetch API when it's clicked */}
          <button class="submit-btn" type="button" onClick={search} >Search</button>
        </Myform></form>
      </div>
      {/* Result after fetch API */}
      <div className="results">
        {/* For each search result */}
        {results.map(result => (
          <div key={result.id} className="card">
            {/* Image section of each search result */}
            <div class="image">
              <img src={`https://image.tmdb.org/t/p/w500${result.poster_path}`} alt={`Movie Poster of ${result.title}`} />
            </div>
            {/* Movie's title */}
            <h2>{result.title}</h2>
            {/* Movie's information */}
            <p id="release">{result.release_date}</p>
            <p>Vote Average Result: {result.vote_average}</p>
            <p>{result.overview}</p>
          </div>
        ))}
      </div>
    </body >
  );
}
export default App;
