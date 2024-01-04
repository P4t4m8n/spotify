import axios from "axios"
import { jwtDecode } from 'jwt-decode'


export const apiService = {
    getPlaylists,
}

const BASE_URL = 'https://api.spotify.com/v1/'

const CLIENT_ID = '5a37d9f51dbf40c8a317e065f0993a47'
const CLIENT_SERCRET = '88c5089152e04a7aa4cdaf5127898e0f'
let accessToken = 'BQAnhJK2WGVQkdGtqHUicHznaHWJkTkBe70XnVpPUSwIkOPXTNoyyE--qF5nNAcNmoBe9vofX84-unW4Z0YqIfiLjwaxmOXdC0H2OLURYL36MUpDtRxwPkhz-BVV12WmRvTc9J8bfyRDPK04MkBV0LD8a-F6A46YZv8wRWs06q6wZu-uuKQ02nfdFCW4G0IWON4vObJ-c8cT2ihRndk'


let url = 'https://api.spotify.com/v1/browse/featured-playlists?country=IL&locale=he_IL'
async function getPlaylists() {
    try {

        // if (isTokenExpired) {
        //     await _refreshToken()
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

async function _refreshToken() {
    try {
        const response = await axios.post('https://accounts.spotify.com/api/token', null, {
            params: {
                grant_type: 'refresh_token',
                refresh_token: 'YOUR_REFRESH_TOKEN',
                client_id: CLIENT_ID,
                client_secret: CLIENT_SERCRET,
            },

        })
        console.log("response:", response)

        accessToken = response.data.access_token
        console.log("accessToken:", accessToken)
    } catch (err) {
        console.log('err refreshing access token:', err)
    }
}



function isTokenExpired(accessToken) {
    try {
        const decodedToken = jwtDecode(accessToken)

        return decodedToken.exp * 1000 < Date.now()
    } catch (err) {
        console.log('err decoding JWT:', err)
        return true
    }
}



