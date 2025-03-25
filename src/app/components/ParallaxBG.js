import React, { useEffect, useState } from 'react';
import { img } from 'next/image';

import sun from '../../parallaxSun.png'
import clouds from '../../parallaxClouds.png'
import foreground from '../../../parallaxForeground.png'
import secondaryForeground from '../../../parallaxForeground2.png'
import mountains from '../../../parallaxMountains.png'
import sky from '../../../parallaxSky.png'

export default function ParallaxBG() {
    const [scrollX, setScrollX] = useState(0);

    useEffect(() => {
        const speed = 1;

        const animate = () => {
            setScrollX((prev) => prev + speed);
            requestAnimationFrame(animate);
        };

        const animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);

    }, []);


    return (
        <div className='parallax'>
            <img 
            src={sun} 
            alt="sun" 
            id="parallax-sun" 
            style={{ transform: `translateX(-${scrollX * 0.2}px)` }}>
            </img>
            <img 
            src={clouds} 
            alt="clouds" 
            id="parallax-clouds" 
            style={{ transform: `translateX(-${scrollX * 0.4}px)` }}>
            </img>
            <img 
            src={sky} 
            alt="sky" 
            id="parallax-sky" 
            style={{ transform: `translateX(-${scrollX * 0.8}px)` }}>
            </img>
            <img 
            src={foreground} 
            alt="foreground" 
            id="parallax-fg" 
            style={{ transform: `translateX(-${scrollX * 0.9}px)` }}>
            </img>
            <img 
            src={secondaryForeground} 
            alt="foreground-2" 
            id="parallax-fg" 
            style={{ transform: `translateX(-${scrollX * 0.8}px)` }}>
            </img>
            <img 
            src={mountains} 
            alt="mountains" 
            id="parallax-mountains" 
            style={{ transform: `translateX(-${scrollX * 0.7}px)` }}>
            </img>
        </div>
    )
}

