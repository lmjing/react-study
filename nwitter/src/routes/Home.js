/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import { dbService, collection, addDoc, getDocs } from "firebase";

const Home = () => {
    const NWEETS_KEY = "nweets";
    const [nweet, setNweet] = useState("");
    const [nweets, setNweets] = useState([]);
    useEffect(() => {
        const fetchNweets = async () => {
            const querySnapshot = await getDocs(collection(dbService, NWEETS_KEY));
            querySnapshot.forEach((doc) => {
                console.log(`${doc.id} => ${doc.data()}`);
                console.log(doc.data());
                const newNweetObj = {
                    ...doc.data(),
                    id: doc.id
                }
                setNweets((prev) => [...prev, newNweetObj])
            });
        }
        fetchNweets();
    }, [])
    const onSubmit = async (event) => {
        event.preventDefault();
        await addDoc(collection(dbService, NWEETS_KEY), {
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
            <div>
                {
                    nweets.map(({ id, nweet }) => (
                        <div key={id}>
                            <h4>{nweet}</h4>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}
export default Home;