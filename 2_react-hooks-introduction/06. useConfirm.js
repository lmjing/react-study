/*
hook 미사요
*/
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles.css";

const useConfirm = (message = "", onConfirm, onCancel) => {
    if (!onConfirm || typeof onConfirm !== "function") return;
    if (onCancel && typeof onCancel !== "function") return;

    const confirmAction = () => {
        if (window.confirm(message)) onConfirm();
        else if (onCancel) onCancel();
    };
    return confirmAction;
};

const App = () => {
    const deleteWorld = () => console.log("The world is deleted...");
    const abort = () => console.log("cancel");
    const confirm = useConfirm("Are you sure?", deleteWorld, abort);
    return (
        <div className="App">
            <button onClick={confirm}>Delete the world!</button>
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
