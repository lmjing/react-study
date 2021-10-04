import React, { useState } from "react";
import { authService, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase";

const AuthForm = () => {
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
            if (newAccont) {
                await createUserWithEmailAndPassword(authService, email, password);
            } else {
                await signInWithEmailAndPassword(authService, email, password);
            }
        } catch (error) {
            setError(error.message);
        }
    }
    const toggleAccount = () => { setNewAccount((prev) => !prev) }
    return (
        <>
            <form onSubmit={onSubmit} className="container">
                <input
                    type="email"
                    name="email"
                    placeholder="email"
                    required value={email}
                    onChange={onChange}
                    className="authInput"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    required
                    value={password}
                    onChange={onChange}
                    className="authInput"
                />
                <input
                    type="submit"
                    className="authInput authSubmit"
                    value={newAccont ? 'Create Account' : 'Log In'} />
                {error && <span className="authError">{error}</span>}
            </form>
            <span onClick={toggleAccount} className="authSwitch">
                {newAccont ? 'Log In' : 'Create Account'}
            </span>
        </>
    )
}

export default AuthForm;