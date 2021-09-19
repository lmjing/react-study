import AppRouter from "components/Router";
import { authService, onAuthStateChanged } from "firebase";
import { useEffect, useState } from "react";


function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    console.log("useEffect")
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  }, []);
  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} /> : "initialize...."}
      <footer>&copy; {new Date().getFullYear()} mijeong</footer>
    </>
  );
}

export default App;
