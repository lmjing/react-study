/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react";
import { authService, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccont, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const { target: { name, value } } = event;
        if (name === "email") setEmail(value);
        else setPassword(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();

        try {
            let data;
            if (newAccont) {
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else {
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        } catch (error) {
            setError(error.message);
        }
    }
    const toggleAccount = () => { setNewAccount((prev) => !prev) }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="email" name="email" placeholder="email" required value={email} onChange={onChange} />
                <input type="password" name="password" placeholder="password" required value={password} onChange={onChange} />
                <input type="submit" value={newAccont ? 'Create Account' : 'Log In'} />
                {error}
            </form>
            <span onClick={toggleAccount}>{newAccont ? 'Log In' : 'Create Account'}</span>
            <button>Continue with Google</button>
            <button>Continue with Github</button>
        </div>
    )
}
export default Auth;