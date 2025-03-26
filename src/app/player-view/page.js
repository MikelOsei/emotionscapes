'use client'
import React, { useEffect, useState } from 'react';
import SubmissionBar from '../components/submission-bar';
import Footer from '../components/Footer';
import ParallaxBG from '../components/ParallaxBG';
import { doc, onSnapshot, updateDoc } from 'firebase/firestore'
import { db } from '../firebase';
import { useSearchParams, useRouter } from 'next/navigation';
import '../components/ui/parallaxBg.css'
import useSession from '../hooks/useSession';



const PlayerView = () => {
    const params = useSearchParams();
    const router = useRouter();
    const [isJoined, setIsJoined] = useState(true);
    if (params.get("sessionId") === "") {
        // reroute to main page.
        console.log("no params received.");
        // router.push('/'); REMOVE AFTER TESTING PHASE
    }

    useEffect(() => {
        function setVh(e) {
            e.preventDefault()
        }
        window.addEventListener('touchmove', setVh, {passive: false});
        return () => window.removeEventListener('touchmove', setVh);
      }, []);

    //const sessionData = useSession(sessionId);
    // show landscape and meme only. 
  

    //if (loading) return <div>Joining session...</div>;
    //if (error) return <div>Error joining: {error}</div>;
    //if (!data) return <div className="p-8 text-center">Error: Session not found</div>;

    return (
        
        <div id="play-screen" style={{overflow: "hidden"}}>
            {!isJoined && <p>Waiting...</p>}
            {isJoined && <> 
            <div id="landscape" style={{position: "fixed", top: 0}}>
                <ParallaxBG />
            </div>
            <div id="meme"></div> {/*visible on laptop, hidden on mobile*/}
            
            <SubmissionBar /> </>}
            <Footer />
        </div>
    )
}

export default PlayerView;