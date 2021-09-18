/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onChange = (event) => {
        const { target: { name, value } } = event;
        if (name === "email") setEmail(value);
        else setPassword(value);
    }
    const onSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="email" name="email" placeholder="email" required value={email} onChange={onChange} />
                <input type="password" name="password" placeholder="password" required value={password} onChange={onChange} />
                <input type="submit" value="Log In" />
            </form>
            <button>Continue with Google</button>
            <button>Continue with Github</button>
        </div>
    )
}
export default Auth;