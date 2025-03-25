'use client'
import { React } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { useState, useEffect } from 'react';
import { db } from "../firebase";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { useRouter, useSearchParams } from 'next/navigation'
import Footer from '../components/Footer'
import useSession from '../hooks/useSession';

function QRscreen({onClick, entity = "host"}) {
    const params = useSearchParams();
    const router = useRouter();
    const playerLink = "mikel.io/emotionscapes/player";
    const { data, loading, error, updateSession, sessionId} = useSession(params.get("sessionId"));
    const [isJoined, setIsJoined] = useState(false);

    console.log("Params: " + params.get("sessionId"));

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

    // Handle loading and error states
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    // Get the number of players from sessionData
    /*const players = data?.players;
    const playerCount = players ? Object.keys(players).length : 0;*/

    function handleClick() {
        router.push('/host-view');
    }

    return (
        <div className="popup" style={{display: "flex", textAlign: "center", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
            <div id="waiting-text">
                <h2 id="waiting-text">Waiting for others to join<span id="wait"/></h2>
            </div>
            <p>Connected players: {playerCount}</p>

            {entity === "host" &&
                <div>
                    <div>
                        <h2 id="underline">Scan to Join</h2>
                        <QRCodeCanvas className="QR" title="QR-Code-to-join" value={'https://www.youtube.com/watch?v=p7YXXieghto'} size={400} bgColor="#F9D9F9" />
                        <p>Or go to: <a style={{color: "#C9FFD9", fontWeight: "bold"}} href={playerLink}>{playerLink}</a></p>
                        <button id="player-option" onClick={() => handleClick()}>Start!</button>
                    </div>
              </div>
            }
            <Footer />
        </div>
            
    );

}

export default QRscreen;