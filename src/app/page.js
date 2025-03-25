'use client'
import React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'
import Footer from './components/Footer'

function LandingPage() {
    const router = useRouter();

    function navigate(view) {
        if (view === "host-join") {
            const playerLink = '/?XYZ';
            router.push('/qr-join'); 
        } else if (view === "player") {
            router.push('/player-view'); 
        } else if (view === "host") {
            router.push('/host-view'); // Playing solo takes to the host page as well (adjust if needed)
        }
    }
    return (
        <div className="homePage" id="homePage">
                    
            <div title="EMOTIONSCAPES" className="glitch" data-text="EMOTIONSCAPES">EMOTIONSCAPES</div>


            <h3 className="purpose">Created by Mikel Osei-Owusu. FINE257 Creation Project</h3>

            <p>How will you be playing today?</p>

            <button id="player-option" onClick={() => navigate("host-join")}>Hosting a session</button>
            <button id="player-option" style={{color: "black"}} onClick={() => navigate("host-join")}>Joining a session</button>
            <button id="player-option" onClick={() => navigate("host")}>Playing solo</button>
            <Footer />
        </div>
    )
}

export default LandingPage;