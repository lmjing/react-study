import React, { useState } from "react";
import { dbService, doc, deleteDoc, updateDoc, storageService, ref, deleteObject } from "firebase";
import { NWEETS_KEY } from "config";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <div className="nweet">
            {
                editing ? (
                    <form onSubmit={onUpdateSubmit} className="container nweetEdit">
                        <input
                            value={newNweet}
                            placeholder="What's on your mind?"
                            type="text"
                            maxLength={120}
                            required
                            onChange={onChange}
                            autoFocus
                            className="formInput"
                        />
                        <input type="submit" value="Update Nweet" className="formBtn" />
                        <span onClick={toggleEditing} className="formBtn cancelBtn">
                            Cancel
                        </span>
                    </form>
                ) : (
                    <>
                        <h4>{nweetObj.text}</h4>
                        {
                            nweetObj.attachmentURL &&
                            <img src={nweetObj.attachmentURL} alt={nweetObj.text} />
                        }
                        {isOwner && (
                            <div className="nweet__actions">
                                <span onClick={onDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                <span onClick={toggleEditing}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </span>
                            </div>
                        )}
                    </>
                )
            }
        </div >
    )

}
export default Nweet;