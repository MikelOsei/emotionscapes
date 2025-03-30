'use client'
import React, { useEffect, useState } from 'react';
import SubmissionBar from "../../components/submission-bar";
import Footer from '../../components/Footer';
import ParallaxBG from '../../components/ParallaxBG';
import { useSearchParams, useRouter } from 'next/navigation';
import "../../components/ui/parallaxBg.css"
import useSession from '../../hooks/useSession';


const PlayerView = () => {
    const params = useSearchParams();
    const router = useRouter();
    const [isJoined, setIsJoined] = useState(true);
    const [emotion, setEmotion] = useState("neutral");
    const [isUIVisible, setUIVisible] = useState(true);

    if (params.get("sessionId") === "") {
        // reroute to main page.
        console.log("no params received.");
        // router.push('/'); REMOVE AFTER TESTING PHASE
    }

    const givenParams = params.get("sessionId");

    const { data, loading, error, updateSession, sessionId } = useSession(givenParams);

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
                <ParallaxBG sessionId={givenParams}/>
            </div>
            <div id="meme"></div> {/*visible on laptop, hidden on mobile*/}
            
            {isUIVisible && <SubmissionBar />}
              <button
                className="hide-show"
                style={{ justifySelf: "left", position: "absolute", zIndex: 100, width: "fit-content"}}
                onClick={() => setUIVisible(!isUIVisible)}>
                {isUIVisible ? "Hide UI" : "Show UI"}
            </button> </>}
            <Footer />
        </div>
    )
}

export default PlayerView;