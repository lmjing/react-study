/*
useEffect = componentDidMount(), componentDidUpdate(), componentWillUnmount() 의 역할을 한다.
- parameter1. function으로서의 effct
    . componentDidMount()와 기능이 비슷함
- parameter2. deps (dependency)
    . useEffect()가 deps리스트에 있는 값이 변할 때만 실행되게 함
    .componentDidUpdate()와 기능이 비슷함
*/
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import React, { useEffect, useState } from "react";

const useTitle = (initialValue) => {
    const [title, setTitle] = useState(initialValue);

    const changeTitle = () => {
        const titleElement = document.querySelector("title");
        titleElement.innerText = title;
    };
    useEffect(changeTitle, [title]);

    return setTitle;
};

export default function App() {
    const titleUpdater = useTitle("...Loading");
    setTimeout(() => {
        titleUpdater("title");
    }, 3000);

    return <div className="App"></div>;
}

const rootElement = document.getElementById("root");
ReactDOM.render(
    <StrictMode>
        <App />
    </StrictMode>,
    rootElement
);
