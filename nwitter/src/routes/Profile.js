/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect } from "react";
import { authService, nweetsRef, signOut, query, where, getDocs, orderBy } from "firebase";
import { useHistory } from "react-router";

const Profile = ({ userObj }) => {
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
    useEffect(() => {
        getMyNweets();
    }, []);

    return (
        <>
            <button onClick={onClickLogout}>Log out</button>
        </>
    )
}

export default Profile;