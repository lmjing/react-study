import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const useNotifictaion = (title, options) => {
    if (!("Notification" in window)) return;

    const fireNotif = () => {
        if (Notification.permission !== "granted") {
            Notification.requestPermission().then((permission) => {
                if (permission === "granted") {
                    new Notification(title, options);
                } else return;
            });
        } else {
        }
    };
    return fireNotif;
};
const App = () => {
    const triggerNotifi = useNotifictaion("Are you OK?", { body: ".3.?" });
    return (
        <div className="App">
            <button onClick={triggerNotifi}>Hello</button>
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
