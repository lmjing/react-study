import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { useState, useEffect } from "react";

const useScroll = () => {
    const [state, setState] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handle = async () => {
            await setState({ x: window.scrollX, y: window.scrollY });
        };
        window.addEventListener("scroll", handle);
        return () => window.removeEventListener("scroll", handle);
    }, []);

    return state;
};

const App = () => {
    const handleNetworking = (online) => {
        console.log(online);
    };
    const { y } = useScroll(handleNetworking);
    return (
        <div className="App" style={{ height: "1000vh" }}>
            <h1 style={{ position: "fixed", color: y > 100 ? "red" : "blue" }}>Hi</h1>
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
