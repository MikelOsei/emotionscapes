"use client"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import SubmissionBar from '../../components/submission-bar';
import Footer from '../../components/Footer'
import ParallaxBG from '../../components/ParallaxBG';
import useSession from '../../hooks/useSession';
import { useRouter } from 'next/navigation';
import { increment } from 'firebase/firestore';
import sad from '../../../../public/sadwhole.png'
import neutral from '../../../../public/neutralwhole.png'
import happy from '../../../../public/happywhole.png'
import Image from 'next/image';

function Host() {
    const params = useSearchParams();
    let givenParams = params.get("sessionId");
    const router = useRouter();

    const [isPlaying, setPlaying] = useState(true);
    const [isUIVisible, setUIVisible] = useState(true);
    const [memeIndex, setIndex] = useState(0);
    const { data, loading, error, updateSession, sessionId } = useSession(givenParams);

    const memes = [
        "https://miro.medium.com/v2/resize:fit:717/1*2SnXTCWsfq5UD4h3nxrtvw.png",
        "https://i.redd.it/bg5skkb8xwqe1.png",
        "https://i.redd.it/0lygf3fw3xqe1.jpeg",
        "https://i.redd.it/ucm8xswkvcjd1.jpeg",
        "https://i.redd.it/wohkrdk5k1kd1.jpeg",
        "https://i.redd.it/to6lhouzhwnd1.jpeg",
        "https://i.redd.it/tkz39mdtyljd1.gif",
        "https://i.imgur.com/iiGZ22C.png",
        "https://i.redd.it/9p1bg399tyzc1.jpeg",
        "https://i.redd.it/uurhx0iqjdjd1.jpeg",
        "https://i.redd.it/f9bf3oflhymd1.jpeg",
        "https://i.redd.it/dg5ud2pjxrkd1.gif",
        "https://i.redd.it/i4wrv7f4f5nd1.jpeg",
        "https://i.redd.it/cfyjaf7zjyqc1.jpeg",
        "https://i.redd.it/7a7sfuk5k76d1.png",
        "https://mygoodtimestories.com/wp-content/uploads/2015/08/lnyrakb.jpg",
        "https://d1y8sb8igg2f8e.cloudfront.net/images/Ukraine_-_Damage.2e16d0ba.fill-1200x630.jpg",
        "https://media.nbcchicago.com/2024/10/gaza.webp",
    ];
    
    const nextMeme = async () => {
        setIndex((prevIndex) => (prevIndex + 1) % memes.length);
    };

    const handleEndSession = () => {
        updateSession({ "gameState": "ended" });
        // let status = updateSession("delete");
        setPlaying(!isPlaying);
    }

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            updateSession({"players": increment(-1)})
            updateSession({ "gameState": "ended" });
            setPlaying(!isPlaying);
        };
        
        window.addEventListener("beforeunload", handleBeforeUnload);
        
        // Cleanup function to remove the event listener
        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    });

    return (
        <>
        {isPlaying &&

        <div className="landscape" style={{ display: "flex", alignItems: "center", justifyContent: "center", position:"relative", height: "100vh", width: "100vw"}}>
          {/*isPlaying &&
            <div style={{width: "100vw", height: "100vh", position: "absolute", zIndex: 100, overflow: "scroll"}}>
                <Image src={sad} alt="sad-background"/>
                <Image src={neutral} alt="sad-background"/>
                <Image src={happy} alt="sad-background"/>
                <button id="hide-show" onClick={() => showStates()} style={{ position: "absolute", zIndex: 3, top: "5px", left: "1px"}}>close</button>
            </div> FOR DEMO-ING
          */}
          <div id="landscape" style={{position: "absolute", marginTop: 0, paddingTop: 0}}>
              <ParallaxBG sessionId={sessionId} />
          </div>
          
         {isUIVisible &&
         <> 
            <div className="meme" style={{ position: "absolute", zIndex: 3, marginBottom: "30px"}}>
            <img src={memes[memeIndex]} alt="Meme" style={{ maxWidth: "100%", height: "auto" }} />
            </div>
            <button id="player-option" onClick={() => nextMeme()} style={{zIndex: 10, position: "absolute", top: "30px"}}>Next Meme ➡️</button>
          </> 
        }   
          <div style={{left: "2vw", position: "absolute", top: "85vh", zIndex: 9}}>
             {isUIVisible && <SubmissionBar />}
              <button
                className="hide-show"
                style={{ justifySelf: "left", position: "absolute", zIndex: 100, width: "fit-content"}}
                onClick={() => setUIVisible(!isUIVisible)}>
                {isUIVisible ? "Hide UI" : "Show UI"}
            </button>
          </div>

          <button className="hide-show" onClick={() => handleEndSession()} style={{ position: "absolute", zIndex: 3, top: "5px", left: "1px", backgroundColor: "rgba(255, 0, 0, 0.2)"}}>End Session</button> 
          </div>}

          {!isPlaying &&
            <div className="popup" style={{flexDirection: "column"}}>
                <h1 id="waiting-text" style={{textAlign: "center"}}>Session ended. Play again soon!</h1>
                <button id="player-option" onClick={() => {
                    router.push('/');
                    }}>Return to home</button>
            </div>
          }
          
          <Footer />

        </>
    )
}


export default Host;