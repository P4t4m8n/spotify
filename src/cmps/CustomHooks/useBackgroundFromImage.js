

import { useEffect, useState } from 'react'
import ColorThief from 'colorthief'

export function useBackgroundFromImage(imageUrl) {
    console.log("imageUrl:", imageUrl)

    const [gradient, setGradient] = useState('linear-gradient(to bottom, #1db954 0%, #121212 100%)')

    useEffect(() => {
        if (imageUrl) {
            const img = new Image()
            img.crossOrigin = 'Anonymous'
            img.src = imageUrl
            console.log('1')
            img.onload = async () => {
                const colorThief = new ColorThief()
                const palette = colorThief.getPalette(img, 2)
                const gradientColors = palette.map(rgb => `rgb(${rgb.join(',')})`)
                setGradient(`linear-gradient(to bottom, 
                    ${gradientColors[0]} 0%, 
                    ${gradientColors[1]} 25%, 
                    #121212 50%, 
                    #121212 75%,   
                    #121212 100%)`)

            }
        }
        else setGradient('linear-gradient(to bottom, #1db954 0%, #121212 100%)')

    }, [imageUrl])

    useEffect(() => {
        document.querySelector('.main-content').style.background = gradient
        console.log("gradient:", gradient)
    }, [gradient])
}
