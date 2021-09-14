import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { useRef, useEffect } from "react";

const useFadeIn = (duration, delay = 0) => {
    const ref = useRef();

    useEffect(() => {
        const element = ref.current;
        if (element) {
            element.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
            element.style.opacity = 1;
        }
    }, []);

    if (!duration || typeof duration !== "number") return;
    if (delay && typeof delay !== "number") return;

    return { ref, style: { opacity: 0 } };
};

const App = () => {
    const h1FadeIn = useFadeIn(2);
    const pFadeIn = useFadeIn(2, 1);
    return (
        <div className="App">
            <h1 {...h1FadeIn}>Hi</h1>
            <p {...pFadeIn}>hello world!!!!!!!!</p>
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
