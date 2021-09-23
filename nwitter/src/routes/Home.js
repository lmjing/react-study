/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import { dbService, collection, addDoc, onSnapshot } from "firebase";
import Nweet from "components/Nweet";
import { NWEETS_KEY } from "config";

const Home = ({ userObj }) => {
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    const fetchData = async () => {
        return await onSnapshot(collection(dbService, NWEETS_KEY),
            (snapshot) => {
                const nweetArray = snapshot.docs.map(doc => (
                    {
                        ...doc.data(),
                        id: doc.id
                    }
                ))
                setNweets(nweetArray);
            });
    }
    useEffect(() => {
        const unsubscribe = fetchData();
        return () => unsubscribe();
    }, [])
    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            text: nweet,
            createdAt: Date.now(),
            creatorId: userObj.uid
        });
    }
    const onChange = (event) => {
        const { target: { value } } = event;
        setNweet(value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="text" placeholder="What's on your mind?" maxLength={120} onChange={onChange} />
                <input type="submit" value="Nweet" />
            </form>
            <div>
                {
                    nweets.map((nweetObj) => (
                        <Nweet key={nweetObj.id} nweetObj={nweetObj} isOwner={nweetObj.creatorId === userObj.uid} />
                    ))
                }
            </div>
        </div>
    )
}
export default Home;