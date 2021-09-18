import React, { useEffect, useState } from "react";

export default useTitle = (initialValue) => {
    const [title, setTitle] = useState(initialValue);

    const changeTitle = () => {
        const titleElement = document.querySelector("title");
        titleElement.innerText = title;
    };
    useEffect(changeTitle, [title]);

    return setTitle;
};
