import React, { useState } from "react";
import { nweetsRef, addDoc, storageService, ref, uploadString, getDownloadURL } from "firebase";
import { v4 as uuidv4 } from 'uuid';

const NweetFactory = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [attachment, setAttachment] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();

        let attachmentURL = "";
        if (attachment.length > 0) {
            const attachmentRef = ref(storageService, `${userObj.uid}/${uuidv4()}`);
            const response = await uploadString(attachmentRef, attachment, 'data_url')
            attachmentURL = await getDownloadURL(response.ref);
        }
        await addDoc(nweetsRef, {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentURL
        });
        setNweet("");
        setAttachment("");
    }
    const onChange = (event) => {
        const { target: { value } } = event;
        setNweet(value);
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
        setAttachment("");
    }
    return (
        <form onSubmit={onSubmit}>
            <input type="text" placeholder="What's on your mind?" maxLength={120} onChange={onChange} value={nweet} />
            <input type="file" accept="image/*" onChange={onFileChange} />
            <input type="submit" value="Nweet" />
            {
                attachment && (
                    <div>
                        <img src={attachment} alt="preview" width="50px" height="50px" />
                        <button onClick={onClearPhotoClick}>Clear</button>
                    </div>
                )
            }
        </form>
    )
}

export default NweetFactory;