import AppRouter from "components/Router";
import { authService, onAuthStateChanged } from "firebase";
import { useEffect, useState } from "react";


function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          photoURL: user.photoURL,
        });
      } else {
        setUserObj(null);
      }
      setInit(true);
    })
  }, []);
  const refreshUser = () => {
    // 너무 많은 데이터를 셋팅하면 과부하가 오므로, 필요한 내용만 담아 업데이트하여 React가 즉시 렌더링 되도록한다.
    const user = authService.currentUser;
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      photoURL: user.photoURL,
    });
  };
  return (
    <>
      {init ? <AppRouter isLoggedIn={userObj !== null} userObj={userObj} refreshUser={refreshUser} /> : "initialize...."}
      <footer>&copy; {new Date().getFullYear()} mijeong</footer>
    </>
  );
}

export default App;
