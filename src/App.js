import { Fragment, useState, React } from "react";
import { useDispatch, useSelector } from "react-redux";
import Header from "./components/Layout/Header";
import MovieList from "./components/Movies/MovieList";
import "./App.css";
import { movieActions } from "./store/movie-slice";

let search = false;

function App() {
  const dispatch = useDispatch();

  const showWatchLater = useSelector((state) => state.movie.showWatchLater);
  const showFav = useSelector((state) => state.movie.showFav);
  const watchLaterArray = useSelector((state) => state.movie.watchLater);
  const favArray = useSelector((state) => state.movie.favorites);

  const [inputValue, setInputValue] = useState();
  const [results, setResults] = useState([]);
  const [searchMovie, setSearchMovie] = useState([]);

  const apiCall = async (query) => {
    const resultsJson = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=37ff5fa3d83036ea57a0f694ba826f9c&query=${query}`
    );
    const resultsArray = await resultsJson.json();

    return resultsArray?.results;
  };

  const getResults = async (e) => {
    search = false;
    setInputValue(e.target.value);
    const result = await apiCall(e.target.value);
    setResults(result);
  };

  const showAllResults = async () => {
    const result = await apiCall(inputValue);
    if (showWatchLater) {
      dispatch(movieActions.toggleWatchList());
    }
    if (showFav) {
      dispatch(movieActions.toggleFavorites());
    }
    search = true;

    setSearchMovie(result);
    setResults([]);
  };

  const listSelection = (result) => {
    if (showWatchLater) {
      dispatch(movieActions.toggleWatchList());
    }
    if (showFav) {
      dispatch(movieActions.toggleFavorites());
    }
    search = true;
    setSearchMovie([result]);
    setResults([]);
    setInputValue(result.original_title);
  };
  return (
    <Fragment>
      <Header />
      <main>
        <div className="emailgrp">
          <div className="searchgrp">
            <input
              placeholder="Search for movies"
              onChange={getResults}
              data-testid="input"
              value={inputValue}
            />
            <button type="button" data-testid="search" onClick={showAllResults}>
              Search
            </button>
          </div>
          {!search && results?.length > 0 && (
            <div className="debounceList">
              {results?.slice(0, 6).map((result, indx) => {
                return (
                  // eslint-disable-next-line react/jsx-key
                  <div role="button" onClick={listSelection.bind(null, result)}>
                    {result.original_title}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {!showFav && !showWatchLater && searchMovie?.length > 0 && (
          <MovieList list={searchMovie} />
        )}
        {!showFav &&
          !showWatchLater &&
          search &&
          (!searchMovie || searchMovie?.length < 1) && <p>No results!</p>}
        {showWatchLater && watchLaterArray.length < 1 && (
          <p>No items for you to watch later!</p>
        )}
        {showFav && favArray.length < 1 && <p>No favorites!</p>}
        {showWatchLater && watchLaterArray.length > 0 && (
          <MovieList list={watchLaterArray} />
        )}
        {showFav && favArray.length > 0 && <MovieList list={favArray} />}
      </main>
    </Fragment>
  );
}

export default App;
