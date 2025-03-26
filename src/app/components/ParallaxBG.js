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
        <div className='parallax'>
            <div className='parallax-sky'> </div>
            <div className='parallax-sun'> </div>
            <div className='parallax-clouds'> </div>
            <div className='parallax-mountains'> </div>
            <div className='parallax-foreground'> </div>
            <div className='parallax-foreground2'> </div>

            {/* style={{ width: '100%', height: 'auto', transform: `translateX(-${scrollX * 0.8}px)`, 
            position: 'fixed', backgroundRepeat: "repeat-y"}}* all: style={{width: "100vw", height: "100vw", backgroundRepeat: 'repeat-x'}}*/}
        </div>    
    )
}

