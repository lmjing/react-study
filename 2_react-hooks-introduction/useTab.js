import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import React, { useState } from "react";

const contents = [
    {
        tab: "Section 1",
        content: "I`m the Section 1"
    },
    {
        tab: "Section 2",
        content: "I`m the Section 2"
    }
];

const useTab = (initialTab, allTabs) => {
    // useState는 최상단에 위치해야 함
    const [currentIdx, setCurrentIdx] = useState(initialTab);
    if (!allTabs || !Array.isArray(allTabs)) return;
    return {
        currentTab: allTabs[currentIdx],
        changeTab: setCurrentIdx
    };
};

const App = () => {
    const { currentTab, changeTab } = useTab(0, contents);
    return (
        <div className="App">
            {contents.map((section, i) => (
                <button key={i} onClick={() => changeTab(i)}>
                    {section.tab}
                </button>
            ))}
            <div>{currentTab.content}</div>
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
