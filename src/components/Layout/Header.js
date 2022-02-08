import { Fragment, useEffect, useState, React } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../../store/movie-slice";
import classes from "./Header.module.css";

const Header = (props) => {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [slideNum, setSlideNum] = useState(0);

  useEffect(() => {
    const timer = setTimeout(nextSlide, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [slideNum]);

  const seeWatchLaterOrFav = (event) => {
    if (event.target.dataset.target == "watch later") {
      dispatch(movieActions.toggleWatchList());
    } else if (event.target.dataset.target == "favorites") {
      dispatch(movieActions.toggleFavorites());
    }
  };

  const nextSlide = () => {
    if (slideNum === 2) {
      setSlideNum(0);
    } else {
      setSlideNum(slideNum + 1);
    }
  };

  const toggleMenu = (e) => {
    setShowMenu(!showMenu);
  };

  const watchLaterItems = useSelector((state) => state.movie.watchLater);
  const favItems = useSelector((state) => state.movie.favorites);
  const cartNumclasses = classes.badge;
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>
          <i
            className="fas fa-video"
            style={{
              marginRight: "0.7rem",
              color: "rgb(63, 63, 63)",
              fontSize: "1.7rem",
            }}
          ></i>
          FULLY FILMY
          <i
            className="fas fa-film"
            style={{
              marginLeft: "0.7rem",
              color: "rgb(89 86 86)",
              fontSize: "1.7rem",
            }}
          ></i>
        </h1>
        <div onClick={seeWatchLaterOrFav}>
          <ul className={classes.ulClass} onClick={toggleMenu}>
            <li>
              {!showMenu && (
                <i className="fas fa-bars" style={{ fontSize: "1.3rem" }}></i>
              )}
              {showMenu && (
                <i className="fas fa-times" style={{ fontSize: "1.3rem" }}></i>
              )}
              <ul style={{ display: `${showMenu ? "block" : "none"}` }}>
                <li>
                  <span data-target="watch later">
                    Wishlist{" "}
                    <span className={cartNumclasses}>
                      {watchLaterItems.length}
                    </span>
                  </span>
                </li>
                <li>
                  <span data-target="favorites">
                    Favorites
                    <span className={cartNumclasses}>{favItems.length}</span>
                  </span>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <nav onClick={seeWatchLaterOrFav}>
          <span data-target="watch later">
            Watch Later{" "}
            <span className={cartNumclasses}>{watchLaterItems.length}</span>
          </span>
          <span data-target="favorites">
            Favorites<span className={cartNumclasses}>{favItems.length}</span>
          </span>
        </nav>
      </header>

      <div className={classes.slide}>
        <div
          className={classes.slideshow}
          style={{ transform: `translateX(${-slideNum * (100 / 3)}%)` }}
        >
          <div className={classes.indSlide}>
            <img
              src="https://cdn.vox-cdn.com/thumbor/qkQt9vRUzzaD5EBG-JWbhIgH-wY=/0x2:640x429/1200x800/filters:focal(0x2:640x429)/cdn.vox-cdn.com/assets/1091601/The-Avengers.jpeg"
              alt=""
            />
          </div>
          <div className={classes.indSlide}>
            <img
              src="https://www.wallpaperflare.com/static/730/647/665/movies-django-unchained-jamie-foxx-leonardo-dicaprio-wallpaper.jpg"
              alt=""
            />
          </div>
          <div className={classes.indSlide}>
            <img
              src="https://mir-s3-cdn-cf.behance.net/project_modules/1400/9e081727685123.56369171b80b1.jpg"
              alt=""
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Header;
