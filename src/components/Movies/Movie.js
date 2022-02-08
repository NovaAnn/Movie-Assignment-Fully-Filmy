import { useDispatch, useSelector, React } from "react-redux";
import classes from "./Movie.module.css";
import { movieActions } from "../../store/movie-slice";

const Movie = (props) => {
  const dispatch = useDispatch();

  const favItems = useSelector((state) => state.movie.favorites);
  const watchLaterItems = useSelector((state) => state.movie.watchLater);

  const addSpecial = (event) => {
    if (event.target.closest("button").dataset.mark == "heart") {
      dispatch(movieActions.addOrRemoveFavorites(props.item));
    } else {
      if (event.target.closest("button").dataset.mark == "plus") {
        dispatch(movieActions.addOrRemoveWatchList(props.item));
      }
    }
  };
  return (
    <li className={classes.meal}>
      <div className={classes.overview}>
        <h3>{props.item.original_title}</h3>
        <div className={classes.description}>{props.item.overview}</div>
        <div className={classes.price}>
          {props.item.vote_average}
          <i className="fas fa-star" style={{ marginLeft: "0.3rem" }}></i>
        </div>
      </div>
      <div role="button" onClick={addSpecial} className={classes.buttonFlex}>
        <button data-mark="heart">
          <span>
            {favItems.includes(props.item)
              ? "Marked Favorite"
              : "Mark as Favorite"}
          </span>
          <i
            className="fas fa-heart"
            style={{
              color: `${favItems.includes(props.item) ? "red" : "grey"}`,
              fontSize: "1.2rem",
              paddingLeft: "0.5rem",
              cursor: "pointer",
            }}
          ></i>
        </button>
        <button data-mark="plus">
          <span>
            {watchLaterItems.includes(props.item)
              ? "Saved For Later"
              : "Save For Later "}
          </span>
          <i
            className="fas fa-plus "
            style={{
              color: `${
                watchLaterItems.includes(props.item) ? "blue" : "black"
              }`,
              fontSize: "1.2rem",
              paddingLeft: "0.5rem",
              cursor: "pointer",
            }}
          ></i>
        </button>
      </div>
    </li>
  );
};

export default Movie;
