"use client"
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CardStack } from '../../components/ui/card-stack';
import SubmissionBar from '../../components/submission-bar';
import Footer from '../../components/Footer'
import ParallaxBG from '../../components/ParallaxBG';
import useSession from '../../hooks/useSession';
import sad from '../../../../public/sadwhole.png'
import neutral from '../../../../public/neutralwhole.png'
import happy from '../../../../public/happywhole.png'
import Image from 'next/image';

function Host() {
    const params = useSearchParams();
    let givenParams = params.get("sessionId");
    const [isPlaying, setPlaying] = useState(false);
    const [isDisplayingMeme, setDisplay] = useState(false);
    const [memeIndex, setIndex] = useState(0);
    const { data, loading, error, updateSession, sessionId } = useSession(givenParams);
    const [filterStyle, setFilterStyle] = useState("");
    

    useEffect(() => {
        if (data && data.emotion) {
            const updatedFilter = getHslFilter(data.emotion);
            setFilterStyle(updatedFilter);
        }
    }, [data?.emotion]);

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

        // Update the emotion in Firebase (this would be triggered by some other logic or form input)
        const newEmotion = getEmotionFromMeme(memeIndex); // You can link this to actual sentiment analysis

        updateSession({
            "emotion" : newEmotion
        })

  
    };

    const getEmotionFromMeme = (index) => {
        // First 5 memes = Joy, next 5 = Sadness, etc.
        if (index < 5) return "Joy";
        if (index < 10) return "Sadness";
        if (index < 12) return "Anger";
        if (index < 17) return "Fear";
        return "Surprise";
    };

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

    const showStates = () => {
        setPlaying(!isPlaying);
    }

    return (

        <div className="landscape" style={{ display: "flex", alignItems: "center", justifyContent: "center", position:"relative", height: "100vh", width: "100vw"}}>
          <>
          {isPlaying &&
            <div style={{width: "100vw", height: "100vh", position: "absolute", zIndex: 100, overflow: "scroll"}}>
                <Image src={sad} alt="sad-background"/>
                <Image src={neutral} alt="sad-background"/>
                <Image src={happy} alt="sad-background"/>
                <button id="hide-show" onClick={() => showStates()} style={{ position: "absolute", zIndex: 3, top: "5px", left: "1px"}}>close</button>
            </div>
          }
          </>
          <div id="landscape" style={{position: "absolute", marginTop: 0, paddingTop: 0}}>
              <ParallaxBG />
          </div>
          
          <div className="meme" style={{ position: "absolute", zIndex: 3, marginBottom: "30px"}}>
            <img src={memes[memeIndex]} alt="Meme" style={{ maxWidth: "100%", height: "auto" }} />
            </div>
            <button id="player-option" onClick={() => nextMeme()} style={{zIndex: 10, position: "absolute", top: "30px"}}>Next Meme ➡️</button>
          
          <div style={{left: "2vw", position: "absolute", top: "85vh", zIndex: 9}}>
              <SubmissionBar />
          </div>

          <button id="hide-show" onClick={() => showStates()} style={{ position: "absolute", zIndex: 3, top: "5px", left: "1px"}}>Demo emotionscapes</button>
          
          <Footer />

        

        </div>
    )
}


export default Host;