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
import React, { useEffect, useRef } from "react";

const useHover = (onClick) => {
    const ref = useRef();
    useEffect(() => {
        const element = ref.current;
        if (element) {
            console.log("add");
            element.addEventListener("mouseenter", onClick);
        }
        return () => {
            if (element) {
                console.log("remove");
                element.removeEventListener("mouseenter", onClick);
            }
        };
    }, [onClick]);

    return ref;
};

const App = () => {
    const sayHello = () => console.log("hello");
    let title = useClick(sayHello);

    return (
        <div className="App">
            <h1 ref={title}>Hi</h1>
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
