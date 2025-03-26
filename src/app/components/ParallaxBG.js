import React, { useEffect, useState } from "react";
import "../components/ui/parallaxBg.css";

import useSession from "../hooks/useSession"
import { useSearchParams } from "next/navigation";

export default function ParallaxBG() {
    const params = useSearchParams();
    const sessionId = params.get("sessionId")
    const { sessionData } = useSession(sessionId)

    const emotion = sessionData?.landscapeState || "neutral"; // Default to neutral if undefined
    const [filter, setFilter] = useState("");

    const getHslFilters = (emotion) => {
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

    useEffect(() => {
        setFilter(getHslFilters(emotion)); // Update filter when emotion changes
    }, [sessionData?.emotion]); 
    
  /*const getHSLFilters = (emotionLevels) => {
    const sadness = emotionLevels[0] || 0; // 0-100
    const joy = emotionLevels[1] || 0;
    const love = emotionLevels[2] || 0;
    const anger = emotionLevels[3] || 0;
    const fear = emotionLevels[4] || 0;
    const surprise = emotionLevels[5] || 0;

    // Calculates hue, saturation, and brightness based on emotions
    // Rotates based on emotion mix
    const hue =
      -1 * sadness +
      1.2 * joy +
      2 * love -
      1.5 * anger -
      0.5 * fear +
      3 * surprise;

    // Joy & love increase saturation, sadness & fear decrease it
    const sat = 100 + 0.6 * joy + 0.8 * love - 0.7 * sadness - 0.5 * fear;

    // Joy & love brighten, sadness & anger darken
    const bright = 100 + 0.5 * joy + 0.7 * love - 0.8 * sadness - 0.4 * anger;

    return {
      hue: `${hue}deg`,
      sat: `${Math.max(50, Math.min(150, sat))}%`,
      bright: `${Math.max(50, Math.min(150, bright))}%`,
    };
    }*/



  return (
    <div className="parallax">
      <div className="parallax-sky"> </div>
      <div className="parallax-sun"> </div>
      <div className="parallax-clouds"> </div>
      <div className="parallax-mountains"> </div>
      <div className="parallax-foreground"> </div>
      <div className="parallax-foreground2"> </div>
      <div className="parallax-rain"> </div>

      {/* style={{ width: '100%', height: 'auto', transform: `translateX(-${scrollX * 0.8}px)`, 
            position: 'fixed', backgroundRepeat: "repeat-y"}}* all: style={{width: "100vw", height: "100vw", backgroundRepeat: 'repeat-x'}}*/}
    </div>
  );
}