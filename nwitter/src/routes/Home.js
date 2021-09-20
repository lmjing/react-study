/* eslint-disable import/no-anonymous-default-export */
import React, { useState } from "react";
import { dbService, collection, addDoc } from "firebase";

const Home = () => {
    const [nweet, setNweet] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService, "nweets"), {
            nweet,
            createdAt: Date.now()
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
        </div>
    )
}
export default Home;