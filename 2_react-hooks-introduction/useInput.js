import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import React, { useState } from "react";

const useInput = (initValue) => {
    const [value, setValue] = useState(initValue);
    const onChange = (event) => {
        const {
            target: { value }
        } = event;
        let willUpdate = true;
        if (typeof validator === "function") {
            willUpdate = validator(value);
        }
        if (willUpdate) {
            setValue(value);
        }
    };
    return { value, onChange };
};

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
