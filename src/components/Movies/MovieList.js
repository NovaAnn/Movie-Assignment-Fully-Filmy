import Card from "../UI/Card";
import Movie from "./Movie";
import classes from "./MovieList.module.css";
import { useState, React } from "react";

let noOfPages = 1;
let startIndx;
let stopIndx;

const MovieList = (props) => {
  const [currentPage, setCurrentPage] = useState(1);

  noOfPages = Math.ceil(props.list.length / 4);
  startIndx = (currentPage - 1) * 4;
  stopIndx = startIndx + 4;

  const movieList = props.list
    .slice(startIndx, stopIndx)
    .map((movie) => <Movie key={movie.id} item={movie} />);

  const pageHandler = (e) => {
    const target = e.target;
    const span = target.dataset.span;

    if (+span === 0) {
      setCurrentPage(currentPage - 1);
    } else if (+span === 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <section data-testid="section" className={classes.meals}>
      <Card>
        <ul>{movieList}</ul>
        {props.list.length > 0 && (
          <div className={classes.btnGrp}>
            {currentPage > 1 && (
              <button onClick={pageHandler} data-span={0}>
                Previous
              </button>
            )}
            <button>{currentPage}</button>

            {currentPage < noOfPages && (
              <button onClick={pageHandler} data-span={1}>
                Next
              </button>
            )}
          </div>
        )}
      </Card>
    </section>
  );
};

export default MovieList;
