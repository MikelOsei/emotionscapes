'use client'
import { React } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation'
import { increment } from 'firebase/firestore';
import Footer from '../../components/Footer'
import useSession from '../../hooks/useSession';

function QRscreen() {
    const params = useSearchParams();
    const router = useRouter();
    const [entity, setEntity] = useState("host");
    let givenParams = params.get("sessionId");
    const { data, loading, error, updateSession, sessionId } = useSession(givenParams);
    // Get the number of players from sessionData
    const playerCount = data?.players;
    const playerLink = 'https://emotionscapes.vercel.app/' + data?.playerPage;

    let gameState = data?.gameState;

    console.log("Params: " + givenParams);
    useEffect(() => {
        console.log("given params: " + givenParams)
        if (givenParams != null) setEntity("player");
    }, [givenParams]);


    useEffect(() => {
        const interval = setInterval(() => {
            const wait = document.getElementById("wait");
            if (wait) {
                wait.innerHTML += ".";
                if (wait.innerHTML.length > 5) wait.innerHTML = "";
            }
        }, 1000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    useEffect(() => {
        if (gameState === "started" && entity === "player") 
        router.push('/player-view?sessionId=' + sessionId)
    }, [router, entity, gameState, sessionId]);

    useEffect(() => {
        window.addEventListener("pagehide", (event) => {
            updateSession({"players": increment(-1)})
            console.log("updated num of players")
        })
    });


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    function handleClick() {
        if (entity === "host") router.push('/host-view?sessionId=' + sessionId);
        updateSession({ "gameState": "started" });
    }

  


    return (
        <div className="popup" style={{display: "flex", textAlign: "center", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "scroll"}}>
            <div id="waiting-text">
                <h2 id="waiting-text">Waiting for others to join<span id="wait"/></h2>
            </div>
            <p>Connected players: {playerCount}</p>

            {entity === "host" &&
                <div>
                    <div>
                        <h2 id="underline">Scan to Join</h2>
                        <QRCodeCanvas className="QR" title="QR-Code-to-join" value={playerLink} size={400} bgColor="#F9D9F9" />
                        <p>Or go to: <a style={{color: "#C9FFD9", fontWeight: "bold"}} href={playerLink}>{playerLink}</a></p>
                        <button id="player-option" style={{marginBottom: "50px"}} onClick={() => handleClick()}>Start!</button>
                    </div>
              </div>
            }
            <Footer />
        </div>
            
    );

}

export default QRscreen;