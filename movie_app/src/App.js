import './App.css';
import PropTypes from 'prop-types';

const foodIlike = [
  {
    id: 1,
    name: "kimchi",
    picture: "https://encrypted-tbn0.gstatic.com/pictures?q=tbn:ANd9GcTFyLqn-fju8k3OD_cgyK51g8qRrcWiOFqMzFngX79bKDwbq4dpmKIL55kisWXyWtoOXwjZI3k&usqp=CAc",
    rating: 4.5
  },
  {
    id: 2,
    name: "ramen",
    picture: "https://mblogthumb-phinf.pstatic.net/MjAyMDA1MjZfNDMg/MDAxNTkwNDgxOTc1OTE1.rpezhYUxGHG0X6-dmVwuACnqm7AugH9CUjxEatcVNsAg.C27glH_kXPk5zTORLyjUbU_yjkGDEbmwZXjaq_xGltIg.JPEG.naverschool/%ED%98%B8%EB%A1%9C%EB%A1%9C%EB%A1%9D.jpg?type=w800",
    rating: 4.7
  },
  {
    id: 3,
    name: "samgiopsal",
    picture: "https://pds.joins.com/news/component/htmlphoto_mmdata/201702/27/117f5b49-1d09-4550-8ab7-87c0d82614de.jpg",
    rating: 4.1
  },
  {
    id: 4,
    name: "doncasu",
    picture: "https://www.ypsori.com/news/photo/201811/14515_14466_1033.jpg",
    rating: 3.2
  }
]

function Food({ name, picture, rating }) {
  return <div>
    <h2>I love {name}</h2>
    <div> {rating}/5.0</div>
    <img src={picture} alt={name} />
  </div>;
}

Food.propTypes = {
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  rating: PropTypes.number
}

function renderFood(dish) {
  return <Food key={dish.id} name={dish.name} picture={dish.picture} rating={dish.rating}/>
}

function App() {
  return (
    <div className="App">
      {foodIlike.map(renderFood)}
    </div>
  );
}

export default App;
