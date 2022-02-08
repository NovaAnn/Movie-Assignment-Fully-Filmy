import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

import App from "./App";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("Page when showWatchLater is true (Ie, clicked on Watch Later) , ", () => {
  const initialState = {
    movie: {
      watchLater: [
        {
          adult: false,
          backdrop_path: "/mfwq2nMBzArzQ7Y9RKE8SKeeTkg.jpg",
          genre_ids: [80, 18, 53],
          id: 274,
          original_language: "en",
          original_title: "The Silence of the Lambs",
          overview:
            "Clarice Starling is a top student at the FBI's training academy. Jack Crawford wants Clarice to interview Dr. Hannibal Lecter, a brilliant psychiatrist who is also a violent psychopath, serving life behind bars for various acts of murder and cannibalism. Crawford believes that Lecter may have insight into a case and that Starling, as an attractive young woman, may be just the bait to draw him out.",
          popularity: 12.903,
          poster_path: "/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg",
          release_date: "1991-02-01",
          title: "The Silence of the Lambs",
          video: false,
          vote_average: 8.3,
          vote_count: 12891,
        },
      ],
      favorites: [],
      showFav: false,
      showWatchLater: true,
    },
  };
  const mockStore = configureStore();
  let store;
  store = mockStore(initialState);
  act(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      container
    );
  });

  expect(container.innerHTML).toContain("The Silence of the Lambs");
});

it("Page when showFav is true (Ie, clicked on Favorites), but doesnt have any items to show in Favorites, but items are there in Watch Later", () => {
  const apiCall = jest.fn();
  apiCall.mockReturnValue([
    {
      adult: false,
      backdrop_path: "/mfwq2nMBzArzQ7Y9RKE8SKeeTkg.jpg",
      genre_ids: [80, 18, 53],
      id: 274,
      original_language: "en",
      original_title: "The Silence of the Lambs",
      overview:
        "Clarice Starling is a top student at the FBI's training academy. Jack Crawford wants Clarice to interview Dr. Hannibal Lecter, a brilliant psychiatrist who is also a violent psychopath, serving life behind bars for various acts of murder and cannibalism. Crawford believes that Lecter may have insight into a case and that Starling, as an attractive young woman, may be just the bait to draw him out.",
      popularity: 12.903,
      poster_path: "/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg",
      release_date: "1991-02-01",
      title: "The Silence of the Lambs",
      video: false,
      vote_average: 8.3,
      vote_count: 12891,
    },
  ]);

  const initialState = {
    movie: {
      watchLater: [
        {
          adult: false,
          backdrop_path: "/mfwq2nMBzArzQ7Y9RKE8SKeeTkg.jpg",
          genre_ids: [80, 18, 53],
          id: 274,
          original_language: "en",
          original_title: "The Silence of the Lambs",
          overview:
            "Clarice Starling is a top student at the FBI's training academy. Jack Crawford wants Clarice to interview Dr. Hannibal Lecter, a brilliant psychiatrist who is also a violent psychopath, serving life behind bars for various acts of murder and cannibalism. Crawford believes that Lecter may have insight into a case and that Starling, as an attractive young woman, may be just the bait to draw him out.",
          popularity: 12.903,
          poster_path: "/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg",
          release_date: "1991-02-01",
          title: "The Silence of the Lambs",
          video: false,
          vote_average: 8.3,
          vote_count: 12891,
        },
      ],
      favorites: [],
      showFav: true,
      showWatchLater: false,
    },
  };
  const mockStore = configureStore();
  let store;
  store = mockStore(initialState);
  act(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      container
    );
  });

  expect(container.innerHTML).toContain("No favorites");
  expect(container.innerHTML).not.toContain("The Silence of the Lambs");
});
it("Mocking API Call with mock data on click of Search button ", async () => {
  const fakeUser = {
    results: [
      {
        adult: false,
        backdrop_path: "/zbcck1Akh2Vxml0oNJO9tqgJdUl.jpg",
        genre_ids: [80, 18, 53, 27],
        id: 9740,
        original_language: "en",
        original_title: "Hannibal",
        overview:
          "After having successfully eluded the authorities for years, Hannibal peacefully lives in Italy in disguise as an art scholar. Trouble strikes again when he's discovered leaving a deserving few dead in the process. He returns to America to make contact with now disgraced Agent Clarice Starling, who is suffering the wrath of a malicious FBI rival as well as the media.",
        popularity: 9.779,
        poster_path: "/v5wAZwRqpGWmyAaaJ8BBHYuNXnj.jpg",
        release_date: "2001-02-08",
        title: "Hannibal",
        video: false,
        vote_average: 6.7,
        vote_count: 3654,
      },
    ],
  };

  const initialState = {
    movie: {
      watchLater: [],
      favorites: [
        {
          adult: false,
          backdrop_path: "/mfwq2nMBzArzQ7Y9RKE8SKeeTkg.jpg",
          genre_ids: [80, 18, 53],
          id: 274,
          original_language: "en",
          original_title: "The Silence of the Lambs",
          overview:
            "Clarice Starling is a top student at the FBI's training academy. Jack Crawford wants Clarice to interview Dr. Hannibal Lecter, a brilliant psychiatrist who is also a violent psychopath, serving life behind bars for various acts of murder and cannibalism. Crawford believes that Lecter may have insight into a case and that Starling, as an attractive young woman, may be just the bait to draw him out.",
          popularity: 12.903,
          poster_path: "/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg",
          release_date: "1991-02-01",
          title: "The Silence of the Lambs",
          video: false,
          vote_average: 8.3,
          vote_count: 12891,
        },
      ],
      showFav: false,
      showWatchLater: false,
    },
  };
  const mockStore = configureStore();
  let store;
  store = mockStore(initialState);
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser),
    })
  );

  // Use the asynchronous version of act to apply resolved promises

  act(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      container
    );
  });

  const button = document.querySelector("[data-testid=search]");
  expect(button).toBeInTheDocument();

  await act(async () => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  expect(container.innerHTML).toContain("Hannibal");
  expect(container.innerHTML).toContain(
    "After having successfully eluded the authorities for years"
  );
  expect(container.innerHTML).not.toContain("The Silence of the Lambs");
});

it("Mocking API Call on click of Search with no data returned from the API", async () => {
  const fakeUser = {};

  const initialState = {
    movie: {
      watchLater: [
        {
          adult: false,
          backdrop_path: "/A7CO0G2HH4PitAjpcUIMhkuLiYk.jpg",
          genre_ids: [99],
          id: 384189,
          original_language: "en",
          original_title: "The Silence of the Lambs: The Inside Story",
          overview:
            "With interviews from cast and crew, including stars Jodie Foster, Anthony Hopkins, and director Jonathan Demme, this feature-length documentary tells the story of how a film with a young director trained in B-movies and cheesy comedies managed to make one of the most chilling films in decades, and how a studio in the midst of collapse turned out a film that took the box office - and Oscars - by storm.",
          popularity: 1.12,
          poster_path: "/2krRKeQIpBbzihmJpVPevmVUwUu.jpg",
          release_date: "2010-09-08",
          title: "The Silence of the Lambs: The Inside Story",
          video: false,
          vote_average: 6.8,
          vote_count: 4,
        },
      ],
      favorites: [
        {
          adult: false,
          backdrop_path: "/mfwq2nMBzArzQ7Y9RKE8SKeeTkg.jpg",
          genre_ids: [80, 18, 53],
          id: 274,
          original_language: "en",
          original_title: "The Silence of the Lambs",
          overview:
            "Clarice Starling is a top student at the FBI's training academy. Jack Crawford wants Clarice to interview Dr. Hannibal Lecter, a brilliant psychiatrist who is also a violent psychopath, serving life behind bars for various acts of murder and cannibalism. Crawford believes that Lecter may have insight into a case and that Starling, as an attractive young woman, may be just the bait to draw him out.",
          popularity: 12.903,
          poster_path: "/rplLJ2hPcOQmkFhTqUte0MkEaO2.jpg",
          release_date: "1991-02-01",
          title: "The Silence of the Lambs",
          video: false,
          vote_average: 8.3,
          vote_count: 12891,
        },
      ],
      showFav: false,
      showWatchLater: false,
    },
  };
  const mockStore = configureStore();
  let store;
  store = mockStore(initialState);
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeUser),
    })
  );

  // Use the asynchronous version of act to apply resolved promises

  act(() => {
    render(
      <Provider store={store}>
        <App />
      </Provider>,
      container
    );
  });

  const button = document.querySelector("[data-testid=search]");
  expect(button).toBeInTheDocument();

  await act(async () => {
    button.dispatchEvent(new MouseEvent("click", { bubbles: true }));
  });

  const section = document.querySelector("[data-testid=section]");
  expect(section).not.toBeInTheDocument();
  expect(container.innerHTML).toContain("No results!");
});
