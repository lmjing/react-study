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
        setValue(value);
        console.log(event.target);
    };
    return { value, onChange };
};

const App = () => {
    const name = useInput("MJ");

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
