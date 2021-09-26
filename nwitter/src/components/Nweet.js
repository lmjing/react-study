import React, { useState } from "react";
import { dbService, doc, deleteDoc, updateDoc, storageService, ref, deleteObject } from "firebase";
import { NWEETS_KEY } from "config";

const Nweet = ({ nweetObj, isOwner }) => {
    const [editing, setEditing] = useState(false);
    const [newNweet, setNewNweet] = useState(nweetObj.text);
    const toggleEditing = () => { setEditing((prev) => !prev) }
    const onDeleteClick = async () => {
        const ok = window.confirm("정말 삭제하시겠습니까?");
        if (ok) {
            await deleteDoc(doc(dbService, NWEETS_KEY, nweetObj.id));
            const attachmentRef = await ref(storageService, nweetObj.attachmentURL);
            await deleteObject(attachmentRef);
        }
    }
    const onChange = (event) => {
        const { target: { value } } = event;
        setNewNweet(value);
    }
    const onUpdateSubmit = async (event) => {
        event.preventDefault();
        const nweetRef = doc(dbService, NWEETS_KEY, nweetObj.id);
        await updateDoc(nweetRef, {
            text: newNweet,
            updatedAt: Date.now()
        });
        setEditing(false);
    }

    return (
        <div>
            {
                editing ? (
                    <form onSubmit={onUpdateSubmit}>
                        <input value={newNweet} placeholder="What's on your mind?" type="text" maxLength={120} required onChange={onChange} />
                        <input type="submit" value="Update Nweet" />
                        <button onClick={toggleEditing}>Cancel</button>
                    </form>
                ) : (
                    <>
                        <h4>{nweetObj.text}</h4>
                        {
                            nweetObj.attachmentURL &&
                            <img src={nweetObj.attachmentURL} alt={nweetObj.text} width="50px" height="50px" />
                        }
                        {isOwner && (
                            <>
                                <button onClick={onDeleteClick}>Delete Nweet</button>
                                <button onClick={toggleEditing}>Edit Nweet</button>
                            </>
                        )}
                    </>
                )
            }
        </div >
    )

}
export default Nweet;