/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect, useState } from "react";
import { nweetsRef, onSnapshot } from "firebase";
import Nweet from "components/Nweet";
import NweetFactory from "components/NweetFactory";

const Home = ({ userObj }) => {
    const [nweets, setNweets] = useState([]);

    useEffect(() => {
        onSnapshot(nweetsRef,
            (snapshot) => {
                const nweetArray = snapshot.docs.map(doc => (
                    {
                        ...doc.data(),
                        id: doc.id
                    }
                ))
                setNweets(nweetArray);
            });
    }, [])
    return (
        <div className="container">
            <NweetFactory userObj={userObj} />
            <div style={{ marginTop: 30 }}>
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