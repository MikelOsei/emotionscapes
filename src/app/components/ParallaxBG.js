import React, { useEffect, useState } from 'react';
import Image from 'next/image';


import sun from '../../../public/parallaxSun.png'
import clouds from '../../../public/parallaxClouds.png'
import foreground from '../../../public/parallaxForeground.png'
import secondaryForeground from '../../../public/parallaxForeground2.png'
import mountains from '../../../public/parallaxMountains.png'
import sky from '../../../public/parallaxSky.png'

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
        <div className='parallax' >
            <Image 
            src={sky} 
            alt="sky" 
            id="parallax-sky" 
            sizes="100vw"
            >
            </Image>

            {/* style={{ width: '100%', height: 'auto', transform: `translateX(-${scrollX * 0.8}px)`, 
            position: 'fixed', backgroundRepeat: "repeat-y"}}* all: style={{width: "100vw", height: "100vw", backgroundRepeat: 'repeat-x'}}*/}


            <Image 
            src={sun} 
            alt="sun" 
            id="parallax-sun" 
            style={{ transform: `translateX(-${scrollX * 0.2}px)` }}>
            </Image>

            <Image
            src={mountains} 
            alt="mountains" 
            id="parallax-mountains" 
            style={{ transform: `translateX(-${scrollX * 0.7}px)` }}>
            </Image>

            <Image 
            src={clouds} 
            alt="clouds" 
            id="parallax-clouds" 
            style={{ transform: `translateX(-${scrollX * 0.4}px)` }}>
            </Image>
            
            <Image
            src={secondaryForeground} 
            alt="foreground-2" 
            id="parallax-fg" 
            style={{ transform: `translateX(-${scrollX * 0.8}px)` }}>
            </Image>
            
            <Image
            src={foreground} 
            alt="foreground" 
            id="parallax-fg" 
            style={{ transform: `translateX(-${scrollX * 0.9}px)` }}>
            </Image>
            
        </div>
    )
}

