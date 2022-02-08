import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    watchLater: [],
    favorites: [],
    showFav: false,
    showWatchLater: false,
  },
  reducers: {
    addOrRemoveFavorites(state, action) {
      const newMovie = action.payload;
      const existingMovie = state.favorites.find(
        (movie) => movie.id === newMovie.id
      );
      if (!existingMovie) {
        state.favorites.push(newMovie);
      } else {
        state.favorites = state.favorites.filter(
          (movie) => movie.id !== newMovie.id
        );
      }
    },
    addOrRemoveWatchList(state, action) {
      const newMovie = action.payload;
      const existingMovie = state.watchLater.find(
        (movie) => movie.id === newMovie.id
      );
      if (!existingMovie) {
        state.watchLater.push(newMovie);
      } else {
        state.watchLater = state.watchLater.filter(
          (movie) => movie.id !== newMovie.id
        );
      }
    },
    toggleWatchList(state) {
      const newState = !state.showWatchLater;
      state.showWatchLater = newState;
      if (newState) {
        state.showFav = false;
      }
    },
    toggleFavorites(state) {
      const newState = !state.showFav;
      state.showFav = newState;
      if (newState) {
        state.showWatchLater = false;
      }
    },
  },
});

export const movieActions = movieSlice.actions;

export default movieSlice;
