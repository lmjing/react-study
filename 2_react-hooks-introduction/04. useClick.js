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

const useClick = (onClick) => {
    const ref = useRef();
    useEffect(() => {
        // 변수를 안에서 copy하지 않으면 warning (ref가 unmount 시점에 null이 된다.)
        const element = ref.current;
        if (element) {
            console.log("add");
            element.addEventListener("click", onClick);
        }
        return () => {
            if (element) {
                console.log("remove");
                element.removeEventListener("click", onClick);
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
