import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import { useRef, useState } from "react";

const useFullScreen = (callback) => {
    const ref = useRef();
    const [state, setState] = useState(false);

    const callcb = (isFull) => {
        if (callback && typeof callback === "function") callback(isFull);
        setState(isFull);
    };

    const triggerFull = () => {
        const element = ref.current;
        if (element) {
            if (element.requestFullscreen) element.requestFullscreen();
            else if (element.mozRequestFullScreen) element.mozRequestFullScreen();
            else if (element.webkitRequestFullscreen)
                element.webkitRequestFullscreen();
            else if (element.msRequestFullscreen) element.msRequestFullscreen();
            callcb(true);
        }
    };

    const exitFull = () => {
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitExitFullscreen) document.webkitExitFullscreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
        callcb(false);
    };

    return { ref, isFull: state, triggerFull, exitFull };
};

const App = () => {
    const onFulls = (isFull) => {
        console.log(isFull ? "full" : "small");
    };
    const { ref, isFull, triggerFull, exitFull } = useFullScreen(onFulls);
    return (
        <div className="App">
            <div ref={ref}>
                <img
                    alt="sample"
                    src="https://source.unsplash.com/random"
                    style={
                        isFull
                            ? { maxHeight: "90%", maxWidth: "100%" }
                            : { maxHeight: "500px", maxWidth: "500px" }
                    }
                />
                <div>
                    <button
                        onClick={triggerFull}
                        style={{ visibility: isFull ? "hidden" : "visible" }}
                    >
                        makeFull!
                    </button>
                    <button
                        onClick={exitFull}
                        style={{ visibility: isFull ? "visible" : "hidden" }}
                    >
                        exitFull!
                    </button>
                </div>
            </div>
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
