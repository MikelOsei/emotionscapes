"use client"
import React, { useEffect, useState } from 'react';
import { CardStack } from '../components/ui/card-stack';
import SubmissionBar from '../components/submission-bar';
import Footer from '../components/Footer'
//import useSession from '../hooks/useSession';


function Host() {
    const [isPlaying, setPlaying] = useState(false);
    const [isDisplayingMeme, setDisplay] = useState(false);
    const [currentMeme, setMeme] = useState(null);

    const [sessionData, setSessionData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
   /* useEffect(() => {
      const fetchSessionData = async () => {
        try {
          const docRef = doc(db, "sessions", sessionId);
          const docSnap = await getDoc(docRef);
  
          if (docSnap.exists()) {
            setSessionData(docSnap.data());
          } else {
            setError("No such session exists!");
          }
        } catch (err) {
          setError("Error fetching session data: " + err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchSessionData();
    }, [sessionId]);*/



    const togglePlay = () => {
        setPlaying(!isPlaying);
    }


    const toggleMeme = () => {
        setDisplay(!isDisplayingMeme);

        if (isDisplayingMeme) {
            // we might just want to hide the currentMeme, instead of getting new one.
           setMeme(getNextMeme(sentiment));
        }
    }

    const toggleHide = () => {
      document.getElementById("input-box").style.display = "none";
      document.getElementById("input-box").style.visibility = "hidden";
      document.getElementById("meme").style.display = "none";
      document.getElementById("meme").style.visibility = "hidden";
    }

    const getNextMeme = () => {
        // fetch meme from DB.
    }

   /* useEffect(() => {
        fetch("http://127.0.0.1:8000/sentiment_anal", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        body: JSON.stringify({
            "text": "I am happy"
        })}).then(response => response.json()).then((res) => console.log(res));
    }, []);*/

    

    return (

        <div className="landscape">

        {/* // page should contain, 
        // bg, image, and submission box (maybe), 
        // also next button functionality that
        // makes the API call */}

          <div className="meme"></div>
          <SubmissionBar />
          <Footer />

        

        </div>
    )
}

export default Host;