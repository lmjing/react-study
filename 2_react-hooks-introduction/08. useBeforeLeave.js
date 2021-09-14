import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { useEffect } from "react";

const useBeforeLeave = (onBefore) => {
    useEffect(() => {
        const handle = (event) => {
            const { clientY } = event;
            if (clientY <= 0) onBefore();
        };
        document.addEventListener("mouseleave", handle);
        return () => document.removeEventListener("mouseleave", handle);
    }, [onBefore]);
    if (!onBefore || typeof onBefore !== "function") return;
};

const App = () => {
    const onBefore = () => console.log("don`t leave ㅠ");
    useBeforeLeave(onBefore);
    return (
        <div className="App">
            <h1> Hi </h1>
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
