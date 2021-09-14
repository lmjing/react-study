/*
useRef
reference? component 중 일부를 선택할 수 있는 방법 (ex. like document.getElementById...)

useEffect
1. useEffect(func, []) = componentDidMount(), componentDidUpdate() 때 func 호출됨
2. useEffect(func, [deps]) = componentDidMount()때 func 호출됨
3. useEffect => func = componentWillUnmount()로 부터 호출됨
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
