"use client";
import React, { useEffect, useState, useRef } from "react";
import "../components/ui/parallaxBg.css";

import useSession from "../hooks/useSession";

export default function ParallaxBG({ sessionId }) {
  const { data, updateSession } = useSession(sessionId);
  let emotion = data?.emotion;

  const [emotionIntensities, setEmotionIntensities] = useState({
    Anger: 0,
    Fear: 0,
    Joy: 0,
    Love: 0,
    Sadness: 0,
    Surprise: 0,
  });

  const [dominantEmotion, setDominantEmotion] = useState("happy");
  const emotionTimeoutRef = useRef(null);

  useEffect(() => {
    if (!data) return;

    // Clear any existing timeout
    if (emotionTimeoutRef.current) {
      clearTimeout(emotionTimeoutRef.current);
    }

    emotionTimeoutRef.current = setTimeout(() => {
      const emotionEntries = Object.entries(emotionIntensities);
      const dominant = emotionEntries.reduce(
        (max, current) => {
          return current[1] > max[1] ? current : max;
        },
        ["happy", 0]
      );

      const emotionMap = {
        Anger: "angry",
        Sadness: "sad",
        Joy: "happy",
        Love: "happy",
        Fear: "sad",
        Surprise: "happy",
      };

      // Get the dominant emotion and its intensity
      const dominantEmotionName = emotionMap[dominant[0]];
      const dominantIntensity = dominant[1];
      setDominantEmotion(dominantEmotionName);
      updateSession({ emotion: dominantEmotion });

      applyFilter(dominantEmotion, dominantIntensity);
    }, 2000);

    return () => {
      if (emotionTimeoutRef.current) {
        clearTimeout(emotionTimeoutRef.current);
      }
    };
  }, [emotionIntensities]);

  useEffect(() => {
    // check for neutral?
    //if (data?.emotion === "neutral") return;
    let intensity = 0.15;
    let updated = data?.Emotions;
    if (!updated) return;

    setEmotionIntensities((prevIntensities) => ({
      Anger: Math.max(
        0,
        Math.min(
          1,
          prevIntensities.Anger +
            (updated.Anger -
              updated.Joy -
              updated.Love -
              0.1 * updated.Sadness) *
              intensity
        )
      ),
      Joy: Math.max(
        0,
        Math.min(
          1,
          prevIntensities.Joy +
            (updated.Joy -
              updated.Anger -
              updated.Sadness +
              updated.Love +
              updated.Surprise * 0.3) *
              intensity
        )
      ),
      Sadness: Math.max(
        0,
        Math.min(
          1,
          prevIntensities.Sadness +
            (updated.Sadness +
              updated.Fear +
              0.2 * updated.Anger -
              updated.Joy -
              updated.Love) *
              intensity
        )
      ),
      Love: Math.max(
        0,
        Math.min(
          1,
          prevIntensities.Love +
            (updated.Love + updated.Joy - updated.Anger - updated.Sadness) *
              intensity
        )
      ),
      Surprise: Math.max(
        0,
        Math.min(
          1,
          prevIntensities.Surprise +
            (updated.Surprise - updated.Fear * 0.5) * intensity
        )
      ),
      Fear: Math.max(
        0,
        Math.min(
          1,
          prevIntensities.Fear +
            (updated.Fear +
              updated.Sadness -
              updated.Joy -
              updated.Love +
              updated.Surprise * 0.2) *
              intensity
        )
      ),
    }));
  }, [data?.Emotions]);

  function applyFilter(emotion, intensity) {
    if (data?.emotion === "neutral") return;
    // const filters = {
    //   sky: {
    //     sad: { hue: "0deg", saturate: 29, brightness: 30 },
    //     happy: { hue: "-33deg", saturate: 153, brightness: 100 },
    //     angry: { hue: "125deg", saturate: 149, brightness: 90, contrast: 200 },
    //   },
    //   mountains: {
    //     sad: { hue: "32deg", saturate: 25, brightness: 40 },
    //     happy: { hue: "37deg", saturate: 136, brightness: 100 },
    //     angry: { hue: "100deg", saturate: 209, brightness: 85, contrast: 110 },
    //   },
    //   clouds: {
    //     sad: { hue: "-10deg", saturate: 117, brightness: 43 },
    //     happy: { hue: "50deg", saturate: 200, brightness: 119 },
    //     angry: { hue: "70deg", saturate: 700, brightness: 80, contrast: 100 },
    //   },
    //   ground: {
    //     sad: { hue: "-42deg", saturate: 100, brightness: 72 },
    //     happy: { hue: "-65deg", saturate: 100, brightness: 136 },
    //     angry: { hue: "70deg", saturate: 301, brightness: 112, contrast: 140 },
    //   },
    // };

    /*let bg = document.getElementById("parallax-bg");
    if (bg != null) {
      const newFilter = `hue-rotate(${filters.sky[emotion].hue}) saturate(${
        filters.sky[emotion].saturate * intensity
      }%) brightness(${filters.sky[emotion].brightness * intensity}%)`;

      bg.style.filter = newFilter;
      console.log(newFilter)
    }*/

    /*for (let e of Object.keys(filters)) {
      if (!emotion) return;
      console.log("e: " + e + " emotion: " + emotion);
      let element = "parallax-" + e;
      let items = document.querySelectorAll("[id=" + element + "]");
      for (let i = 0; i < items.length; i++) {
        const newFilter = `hue-rotate(${filters[e][emotion].hue}) saturate(${
          filters[e][emotion].saturate * intensity
        }%) brightness(${
          filters[e][emotion].brightness * intensity
        }%) contrast(${filters[e][emotion].contrast || 100}%)`;

        items[i].style.filter = newFilter;
      }*/ const baseFilters = {
      sky: { hue: "0deg", saturate: 100, brightness: 100, contrast: 100 },
      mountains: { hue: "0deg", saturate: 100, brightness: 100, contrast: 100 },
      clouds: { hue: "0deg", saturate: 100, brightness: 100, contrast: 100 },
      ground: { hue: "0deg", saturate: 100, brightness: 100, contrast: 100 },
    };

    // Target filter values (full intensity)
    const targetFilters = {
      sky: {
        sad: { hue: "0deg", saturate: 29, brightness: 30, contrast: 100 },
        happy: { hue: "-33deg", saturate: 153, brightness: 110, contrast: 110 },
        angry: { hue: "125deg", saturate: 149, brightness: 90, contrast: 200 },
      },
      mountains: {
        sad: { hue: "32deg", saturate: 25, brightness: 40, contrast: 100 },
        happy: { hue: "37deg", saturate: 136, brightness: 120, contrast: 110 },
        angry: { hue: "100deg", saturate: 209, brightness: 85, contrast: 110 },
      },
      clouds: {
        sad: { hue: "-10deg", saturate: 117, brightness: 43, contrast: 100 },
        happy: { hue: "50deg", saturate: 200, brightness: 119, contrast: 110 },
        angry: { hue: "70deg", saturate: 700, brightness: 80, contrast: 100 },
      },
      ground: {
        sad: { hue: "-42deg", saturate: 100, brightness: 72, contrast: 100 },
        happy: { hue: "-65deg", saturate: 100, brightness: 136, contrast: 110 },
        angry: { hue: "70deg", saturate: 301, brightness: 112, contrast: 140 },
      },
    };

    const interpolate = (base, target, intensity) => {
      if (typeof target === "string" && target.includes("deg")) {
        const baseVal = parseInt(base);
        const targetVal = parseInt(target);
        return `${baseVal + (targetVal - baseVal) * intensity}deg`;
      }

      return base + (target - base) * intensity;
    };

    for (let e of Object.keys(targetFilters)) {
      if (emotion === null) return;
      let element = "parallax-" + e;
      let items = document.querySelectorAll("[id=" + element + "]");

      for (let i = 0; i < items.length; i++) {
        const base = baseFilters[e];
        const target = targetFilters[e][emotion];
        if (!target || !base) return;

        const newFilter = `hue-rotate(${interpolate(0, target.hue, intensity)}) 
                               saturate(${interpolate(
                                 base.saturate,
                                 target.saturate,
                                 intensity
                               )}%) 
                               brightness(${interpolate(
                                 base.brightness,
                                 target.brightness,
                                 intensity
                               )}%) 
                               contrast(${interpolate(
                                 base.contrast,
                                 target.contrast || 100,
                                 intensity
                               )}%)`;

        items[i].style.filter = newFilter;
      }
    }
  }


  /*useEffect(() => {
      switch (emotion) {
        case "Sadness":
            applyFilter("sad")
            break;
        case "Joy":
            applyFilter("happy")
            break;
        case "Anger":
            applyFilter("angry")
            break;
        } 
    }, [emotion]);

    function applyFilter(emotion) {
      const filters = {
          sky: {
              sad: "hue-rotate(0deg) saturate(29%) brightness(30%)",
              happy: "hue-rotate(-33deg) saturate(153%) brightness(100%)",
              angry: "hue-rotate(125deg) saturate(149%) brightness(90%) contrast(200%)",
          },
          mountains: {
              sad: "hue-rotate(32deg) saturate(25%) brightness(40%)",
              happy: "hue-rotate(37deg) saturate(136%) brightness(100%)",
              angry: "hue-rotate(100deg) saturate(209%) brightness(85%) contrast(110%)",
          },
          clouds: {
              sad: "hue-rotate(-10deg) saturate(117%) brightness(43%)",
              happy: "hue-rotate(50deg) saturate(200%) brightness(119%)",
              angry: "hue-rotate(70deg) saturate(700%) brightness(80%) contrast(100)",
          },
          ground: {
              sad: "hue-rotate(-42deg) saturate(100%) brightness(72%)",
              happy: "hue-rotate(-65deg) saturate(100%) brightness(136%)",
              angry: "hue-rotate(70deg) saturate(301%) brightness(112%) contrast(140%)",
          }
      };

     let bg = document.getElementById("parallax-bg");
      if (bg != null) {
        bg.style.filter = filters["sky"][emotion];
      }
      
      for (let e of Object.keys(filters)) {
        console.log("running....")
        if (emotion === null) return;
        let element = 'parallax-' + e;
        let items = document.querySelectorAll("[id=" + element + "]")

        for (let i = 0; i < items.length; i++) items[i].style.filter = filters[e][emotion];

      }
  }*/

  return (
    <div className="parallax" id="parallax">
      <div id="parallax-sky" className="parallax-bg" />
      <div className="parallax-sky" id="parallax-sky"></div>
      {emotionIntensities.Sadness <= 0.5 && (
        <div
          className="parallax-sun"
          id="parallax-sun"
          style={{ animation: "fade" }}
        ></div>
      )}
      <div className="parallax-clouds" id="parallax-clouds">
        {" "}
      </div>
      <div className="parallax-mountains" id="parallax-mountains">
        {" "}
      </div>
      <div className="parallax-foreground" id="parallax-ground">
        {" "}
      </div>
      <div className="parallax-foreground2" id="parallax-ground">
        {" "}
      </div>
      {emotionIntensities.Sadness >= 0.5 && (
        <div className="parallax-rain"> </div>
      )}
    </div>
  );
}
