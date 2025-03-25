'use client'
import React, { useEffect, useState } from 'react';
import SubmissionBar from '../components/submission-bar';
import Footer from '../components/Footer';
import ParallaxBG from '../components/ParallaxBG';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../firebase';
import { useParams } from 'next/navigation';
import useSession from '../hooks/useSession';



const PlayerView = () => {
    const [isJoined, setIsJoined] = useState(true);
    //const sessionData = useSession(sessionId);
    // show landscape and meme only. 
  

    //if (loading) return <div>Joining session...</div>;
    //if (error) return <div>Error joining: {error}</div>;
    //if (!data) return <div className="p-8 text-center">Error: Session not found</div>;

    return (
        
        <div id="play-screen">
            //{!isJoined && <p>Waiting...</p>}
            {isJoined && <> 
            <div id="landscape"></div>
            <div id="meme"></div> {/*visible on laptop, hidden on mobile*/}
            <ParallaxBG />
            <SubmissionBar /> </>}
            <Footer />
        </div>
    )
}

export default PlayerView;