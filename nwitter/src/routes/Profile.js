/* eslint-disable import/no-anonymous-default-export */
import React from "react";
import { authService, signOut } from "firebase";
import { useHistory } from "react-router";

const Profile = () => {
    let history = useHistory();
    const onClickLogout = () => {
        signOut(authService);
        history.push("/");
    }

    return (
        <>
            <button onClick={onClickLogout}>Log out</button>
        </>
    )
}

export default Profile;