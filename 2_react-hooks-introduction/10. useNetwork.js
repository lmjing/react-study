import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { useState, useEffect } from "react";

const useNetwork = (onChange) => {
    const [status, setStatus] = useState(navigator.onLine);

    useEffect(() => {
        const handle = () => {
            if (onChange && typeof onChange === "function") {
                onChange(navigator.onLine);
            }
            setStatus(navigator.onLine);
        };
        window.addEventListener("online", handle);
        window.addEventListener("offline", handle);
        return () => {
            window.removeEventListener("online", handle);
            window.removeEventListener("offline", handle);
        };
    }, [onChange]);
    return status;
};

const App = () => {
    const handleNetworking = (online) => {
        console.log(online ? "we are online" : "we are offline");
    };
    const online = useNetwork(handleNetworking);
    return (
        <div className="App">
            <h1>{online ? "Online" : "Offline"}</h1>
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
