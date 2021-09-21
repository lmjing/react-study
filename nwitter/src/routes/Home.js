/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import { dbService, collection, addDoc, onSnapshot } from "firebase";

const Home = ({ userObj }) => {
    const NWEETS_KEY = "nweets";
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    useEffect(() => {
        const unsubscribe = onSnapshot(collection(dbService, NWEETS_KEY),
            (snapshot) => {
                const nweetArray = snapshot.docs.map(doc => (
                    {
                        ...doc.data(),
                        id: doc.id
                    }
                ))
                setNweets(nweetArray);
            });
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
                    nweets.map(({ id, text }) => (
                        <div key={id}>
                            <h4>{text}</h4>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Home;