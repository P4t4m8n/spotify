import axios from "axios"
import { jwtDecode } from 'jwt-decode'

const CLIENT_ID = '5a37d9f51dbf40c8a317e065f0993a47'
const CLIENT_SERCRET = '88c5089152e04a7aa4cdaf5127898e0f'
const REDIRECT_URI = 'http://localhost:3000/callback'
const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token'
let accessToken = 'BQDHaOiCUv4DBaKbycfWp1VVZ_zkvm8JrP9EWIVyaCP1qrmC2uIzFvy0GXbtWLGVvMMlyHWnsj3NpuVk7_oC07WWTj878j7wI4n243GdVyzzb_G580zfm4qRdXlL9C9LjXSPQuKqUcBKeoonWVMwVbWTmeoVsoEJVXHF6qIj6dcc0BpXrHgmeiKih7nGaOcRxja-ojAgahEmVQfO98c'

export const apiService = {
    getPlaylists,
}

const BASE_URL = 'https://api.spotify.com/v1/'


async function getPlaylists(filterBy={}) {
    
    const country = filterBy.country || 'IL'
    console.log("country:", country)
    const local = filterBy.local || 'he_IL'
    console.log("local:", local)
    const limit = filterBy.limit || '50'
    console.log("limit:", limit)
    const offset = filterBy.offset || '50'
    console.log("offset:", offset)
    const url = `https://api.spotify.com/v1/browse/featured-playlists?country=${country}&locale=${local}`

    try {

        // if (isTokenExpired(accessToken)) {
        //     accessToken = await _refreshToken()
        // }

        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        return response.data.playlists.items

    }
    catch (err) {
        console.log("err fetching playlists:", err)
        throw err
    }
}























































// function initiateAuthorization() {
//     const authUrl = new URL(AUTH_ENDPOINT)
//     authUrl.searchParams.append('client_id', CLIENT_ID)
//     authUrl.searchParams.append('response_type', 'code')
//     authUrl.searchParams.append('redirect_uri', REDIRECT_URI)

//     window.location.href = authUrl.toString()
// }

// async function exchangeCodeForTokens(authorizationCode) {
//     const payload = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded',
//         },
//         body: new URLSearchParams({
//             grant_type: 'authorization_code',
//             code: authorizationCode,
//             redirect_uri: REDIRECT_URI,
//             client_id: CLIENT_ID,
//             client_secret: 'your_client_secret', // Replace with your actual client secret
//         }),
//     }

//     try {
//         const response = await fetch(TOKEN_ENDPOINT, payload)
//         const tokens = await response.json()
//         console.log('Tokens:', tokens)

//         const refresh_token = tokens.refresh_token
//         return refresh_token
//     } catch (error) {
//         console.error('Error exchanging code for tokens:', error)
//         throw error
//     }
// }

// initiateAuthorization()

// const authorizationCode = 'BQAqkqrEbWV-JJj91taGwpfSoVcVdIjo1aViFFxS1OW8D_4rNnERQApRCb_1GIKkkR0UCha3bjsStr7b1GzFKdsnGiJcpgpzVk0nknlDUILKSz32CHQqzhJh6Mmkhg9-nAtCLrnhT2UyWbv8IZhmRnnf0jCrMNE4U7lWbPtxYeWJa2rFF7ZpUJ6nT38rQj9IQH3CshWHLiSR3fciO9o'
// exchangeCodeForTokens(authorizationCode)
//     .then((refresh_token) => {
//         console.log('Refresh Token:', refresh_token)
//     })
//     .catch((error) => {
//         console.error('Error getting refresh token:', error)
//     })




// async function _refreshToken(refreshToken) {

//     let accessToken = 'BQAnhJK2WGVQkdGtqHUicHznaHWJkTkBe70XnVpPUSwIkOPXTNoyyE--qF5nNAcNmoBe9vofX84-unW4Z0YqIfiLjwaxmOXdC0H2OLURYL36MUpDtRxwPkhz-BVV12WmRvTc9J8bfyRDPK04MkBV0LD8a-F6A46YZv8wRWs06q6wZu-uuKQ02nfdFCW4G0IWON4vObJ-c8cT2ihRndk'

//     const url = "https://accounts.spotify.com/api/token"

//     const payload = {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/x-www-form-urlencoded'
//         },
//         body: new URLSearchParams({
//             grant_type: 'refresh_token',
//             refresh_token: refreshToken,
//             client_id: CLIENT_ID,
//             client_secret: CLIENT_SERCRET
//         }),
//     }

//     try {
//         const data = await fetch(url, payload)
//         const response = await data.json()
//         console.log('Refreshed Token:', response)
//         return response
//     } catch (error) {
//         console.error('Error refreshing token:', error)
//         throw error
//     }

// }



// function isTokenExpired(accessToken) {
//     console.log("accessToken:", accessToken)
//     try {
//         if (!accessToken) {
//             console.log('accessToken is empty or undefined.')
//             return true
//         }

//         const parts = accessToken.split('.')
//         if (parts.length !== 3) {
//             console.log('Invalid token structure: missing parts.')
//             return true
//         }

//         const decodedToken = jwtDecode(accessToken)
//         return decodedToken.exp * 1000 < Date.now()
//     } catch (err) {
//         console.log('Error decoding JWT:', err)
//         return true
//     }
// }



