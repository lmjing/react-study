import './App.css';

const foodIlike = [
  {
    id: 1,
    name: "kimchi",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFyLqn-fju8k3OD_cgyK51g8qRrcWiOFqMzFngX79bKDwbq4dpmKIL55kisWXyWtoOXwjZI3k&usqp=CAc"
  },
  {
    id: 2,
    name: "ramen",
    image: "https://mblogthumb-phinf.pstatic.net/MjAyMDA1MjZfNDMg/MDAxNTkwNDgxOTc1OTE1.rpezhYUxGHG0X6-dmVwuACnqm7AugH9CUjxEatcVNsAg.C27glH_kXPk5zTORLyjUbU_yjkGDEbmwZXjaq_xGltIg.JPEG.naverschool/%ED%98%B8%EB%A1%9C%EB%A1%9C%EB%A1%9D.jpg?type=w800"
  },
  {
    id: 3,
    name: "samgiopsal",
    image: "https://pds.joins.com/news/component/htmlphoto_mmdata/201702/27/117f5b49-1d09-4550-8ab7-87c0d82614de.jpg"
  },
  {
    id: 4,
    name: "doncasu",
    image: "http://th2.tmon.kr/thumbs/image/423/336/e17/1b1492318_700x700_95_FIT.jpg"
  }
]

function Food({ name, picture }) {
  return <div>
    <h2>I love {name}</h2>
    <img src={picture} alt={name} />
  </div>;
}

function renderFood(dish) {
  return <Food key={dish.id} name={dish.name} picture={dish.image} />
}

function App() {
  return (
    <div className="App">
      {foodIlike.map(renderFood)}
    </div>
  );
}

export default App;
