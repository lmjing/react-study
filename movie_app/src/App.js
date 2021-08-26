import './App.css';

function Food({favourite}) {
  return <h3>I love {favourite}</h3>;
}

function App() {
  return (
    <div className="App">
      Hello!
      <Food favourite="kimchi"/>
      <Food favourite="ramen"/>
      <Food favourite="samgiopsal"/>
    </div>
  );
}

export default App;
