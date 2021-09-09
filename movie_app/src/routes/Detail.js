import React from "react";
import { Redirect } from "react-router";
import "../components/Movie.css";

class Detail extends React.Component {
    componentDidMount() {
        const { history, location } = this.props;
        if (!location.state) {
            history.push('/');
        }
    }

    render() {
        const { location } = this.props;
        if (location.state) {
            const { year, title, summary, poster, genres } = location.state;
            return <div className="detail__container">
                <div className="movie">
                    <img src={poster} className="poster" />
                    <div className="movie__data">
                        <h3 className="movie__title">{title}</h3>
                        <h5 className="movie__year">{year}</h5>
                        <ul className="movie__genres">
                            {
                                genres.map((genre, idx) =>
                                    <li key={idx} className="genres__genre">
                                        {genre}
                                    </li>
                                )
                            }
                        </ul>
                        <p className="movie__summary">{summary}</p>
                    </div>
                </div>
            </div>
        } else {
            return null;
        }
    }
}

// function Detail(props) {
//     /*
//     location: 현재 위치, state 등 확인 가능
//     history: 브라우저 히스토리
//     */
//     console.log(props);
//     return <div>detail</div>
// }

export default Detail;