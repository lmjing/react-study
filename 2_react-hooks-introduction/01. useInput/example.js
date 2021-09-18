import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import useInput from "./useInput";

const App = () => {
    const maxLen = (value) => value.length < 10;
    const name = useInput("MJ", maxLen);

    return (
        <div className="App">
            <h1>Hello</h1>
            {/* <input value={name.value} onChange={name.onChange} /> */}
            <input placeholder="Name" {...name} />
        </div>
    );
};

const rootElement = document.getElementById("root");
ReactDOM.render(
    <StrictMode>
        <App />
    </StrictMode>,
    rootElement
);
