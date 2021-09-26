/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import { authService, nweetsRef, signOut, query, where, getDocs, orderBy, updateProfile } from "firebase";
import { useHistory } from "react-router";

const Profile = ({ userObj }) => {
    const [displayName, setDisplayName] = useState(userObj.displayName);
    useEffect(() => {
        getMyNweets();
    }, []);

    let history = useHistory();
    const onClickLogout = () => {
        signOut(authService);
        history.push("/");
    }

    const getMyNweets = async () => {
        const q = query(nweetsRef, where("creatorId", "==", userObj.uid), orderBy("createdAt"))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
        })
    };
    const onDisplayNameChange = (event) => {
        const { target: { value } } = event;
        setDisplayName(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        await updateProfile(userObj, {
            displayName
        })
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" value={displayName} onChange={onDisplayNameChange} />
                <input type="submit" value="프로필 변경" />
            </form>
            <button onClick={onClickLogout}>Log out</button>
        </>
    )
}

export default Profile;