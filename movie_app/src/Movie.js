import React from "react";
import PropTypes from "prop-types";

function Movie({ id, year, title, summary, poster }) {
    console.log(id, year, title, summary, poster);
    // return <h5>{title}</h5>;
    return <div className="movie">
        <img src={poster} className="poster" />
        <div className="movie__data">
            <h3 className="movie__title">{title}</h3>
            <h5 className="movie__year">{year}</h5>
            <p className="movie__summary">{summary}</p>
        </div>
    </div>;
}

Movie.propTypes = {
    id: PropTypes.number.isRequired,
    year: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
};

export default Movie;
