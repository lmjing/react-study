/*
hook 미사용
*/
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const usePreventLeave = () => {
    const listener = (e) => {
        e.preventDefault();
        e.returnValue = "";
    };
    const enablePrevent = () => window.addEventListener("beforeunload", listener);
    const diablePrevent = () =>
        window.removeEventListener("beforeunload", listener);
    return { enablePrevent, diablePrevent };
};

const App = () => {
    const { enablePrevent, diablePrevent } = usePreventLeave();
    return (
        <div className="App">
            <button onClick={enablePrevent}>Protect</button>
            <button onClick={diablePrevent}>Unprotect</button>
        </div>
    );
}


const rootElement = document.getElementById("root");
ReactDOM.render(
    <StrictMode>
        <App />
    </StrictMode>,
    rootElement
);
