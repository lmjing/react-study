import { useState } from "react";

export default useInput = (initValue) => {
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