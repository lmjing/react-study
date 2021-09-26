/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import { authService, nweetsRef, signOut, query, where, getDocs, orderBy, updateProfile, ref, storageService, uploadString, getDownloadURL } from "firebase";
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from "react-router";

const Profile = ({ userObj }) => {
    const defaultPhotoURL = "https://cdn-icons-png.flaticon.com/512/1177/1177568.png";
    const [displayName, setDisplayName] = useState(userObj.displayName ?? "");
    const [attachment, setAttachment] = useState(userObj.photoURL);
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
    const onFileChange = (event) => {
        const { target: { files } } = event;
        const reader = new FileReader();
        reader.onload = ((e) => {
            const { currentTarget: { result } } = e;
            setAttachment(result);
        })
        reader.readAsDataURL(files[0]);
    }
    const onClearPhotoClick = (event) => {
        event.preventDefault();
        setAttachment(defaultPhotoURL);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentURL = ""
        if (attachment && attachment.length > 0) {
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(attachmentRef, attachment, 'data_url')
            attachmentURL = await getDownloadURL(response.ref);
        }
        await updateProfile(userObj, {
            displayName,
            photoURL: attachmentURL
        });
    }

    return (
        <>
            <form onSubmit={onSubmit}>
                <input type="text" value={displayName} onChange={onDisplayNameChange} />
                <div>
                    <img src={attachment ?? defaultPhotoURL} alt="preview" width="50px" height="50px" />
                    <input type="file" accept="image/*" onChange={onFileChange} />
                    <button onClick={onClearPhotoClick}>Clear</button>
                </div>
                <input type="submit" value="프로필 변경" />
            </form>
            <button onClick={onClickLogout}>Log out</button>
        </>
    )
}

export default Profile;