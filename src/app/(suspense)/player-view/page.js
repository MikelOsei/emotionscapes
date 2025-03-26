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

      useEffect(() => {
        if (data && data.emotion) {
            const updatedFilter = getHslFilter(data.emotion);
            setEmotion(data.emotion); // Update the emotion state from session data
        }
    }, [data?.emotion]);

    const getHslFilter = (emotion) => {
        switch (emotion) {
            case "Sadness": return "hue-rotate(220deg) saturate(50%)"; // Blue tones
            case "Joy": return "hue-rotate(30deg) saturate(120%)"; // Warm tones (yellow/pink)
            case "Love": return "hue-rotate(330deg) saturate(150%)"; // Pinkish hues
            case "Anger": return "hue-rotate(0deg) saturate(150%)"; // Reddish tones
            case "Fear": return "hue-rotate(270deg) saturate(80%)"; // Dark purple/grayish tones
            case "Surprise": return "hue-rotate(60deg) saturate(130%)"; // Bright golden hues
            default: return "";
        }
    };

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