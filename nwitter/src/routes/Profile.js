/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import { authService, nweetsRef, signOut, query, where, getDocs, orderBy, updateProfile, ref, storageService, uploadString, getDownloadURL } from "firebase";
import { v4 as uuidv4 } from 'uuid';
import { useHistory } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const Profile = ({ userObj, refreshUser }) => {
    const defaultPhotoURL = "https://cdn-icons-png.flaticon.com/512/1177/1177568.png";
    const [displayName, setDisplayName] = useState(userObj.displayName ?? "");
    const [attachment, setAttachment] = useState(userObj.photoURL);
    useEffect(() => {
        getMyNweets();
    }, []);

    let history = useHistory();
    const onClickLogout = async () => {
        await signOut(authService);
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
        setAttachment(null);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentURL = "";
        if (attachment && attachment === userObj.photoURL) attachmentURL = userObj.photoURL;
        else if (attachment && attachment.length > 0) {
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(attachmentRef, attachment, 'data_url')
            attachmentURL = await getDownloadURL(response.ref);
        }
        await updateProfile(authService.currentUser, {
            displayName,
            photoURL: attachmentURL
        });
        refreshUser();
    }

    return (
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input
                    type="text"
                    value={displayName}
                    autoFocus
                    onChange={onDisplayNameChange}
                />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
                <div>
                    <div className="profileForm__attachment">
                        <img
                            src={attachment ?? defaultPhotoURL}
                            alt="profileImage"
                            style={{
                                backgroundImage: attachment ?? defaultPhotoURL,
                            }}
                        />
                        <div className="profileForm__edit">
                            <span onClick={onClearPhotoClick}>
                                <span>Remove</span>
                                <FontAwesomeIcon icon={faTimes} />
                            </span>
                            <span>
                                <label htmlFor="attach-file" className="factoryInput__label">
                                    <span>Edit photo</span>
                                    <FontAwesomeIcon icon={faPlus} />
                                </label>
                                <input
                                    id="attach-file"
                                    type="file"
                                    accept="image/*"
                                    onChange={onFileChange}
                                    style={{
                                        opacity: 0,
                                        height: 0
                                    }}
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onClickLogout}>
                Log Out
            </span>
        </div>
    )
}

export default Profile;