// import ytdl from 'ytdl-core'
import fs from 'fs'
// import playSound from 'play-sound'
import axios from 'axios'




import { useSelector } from "react-redux"
import  YouTubeAudioPlayer  from "./YouTubeAudioPlayer"

export function AppFooter() {
    console.log('hi from AppFooter')

    // const API='AIzaSyCoga7dmG4dfuYXCqS3ghhsRE8VC-5zdZM'
    // const URL= `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=Ks-_Mh1QhMc&key=${API}` 



// הפונקציה לקריאת מידע מה- API
// async function fetchSongs(URL) {
//     try {
//         const response = await axios.get(URL);
//         const songs = response.data.songs; // לדוגמה, אם המידע כולל מאפיין songs

//         // טיפול במידע ושימוש בו כפי שרלוונטי לך
//         console.log('Songs:', songs);
//     } catch (error) {
//         console.error('Error:', error.message);
//     }
// }

// הפעלת הפונקציה עם כתובת ה-URL של ה- API
/*const yourApiUrl = 'YOUR_API_ENDPOINT';
fetchSongs(URL);

    
    // הפונקציה שמורידה ומשמיעה את הקובץ
    /*async function downloadAndPlayMP3(url) {


        try {
            // הורדת הוידאו מ-YouTube כקובץ MP3
            const info = await ytdl.getInfo(url);
            const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
            const audio = audioFormats.find(format => format.container === 'mp3');
            
            if (!audio) {
                throw new Error('MP3 format not found');
            }
            
            // שמירת הקובץ MP3 למקום זמני במחשב
            const fileName = `tempAudio.${audio.container}`;
            await ytdl.downloadFromInfo(info, { format: audio })
                    .pipe(fs.createWriteStream(fileName));
    
            // השמעת הקובץ MP3
            const player = playSound({ player: 'afplay' }); // במקרה של macOS, לשינוי בהתאם למערכת הפעלה
            player.play(fileName, (err) => {
                if (err) {
                    throw new Error('Error playing the MP3 file');
                }
                console.log('Audio played successfully');
            });
        } catch (error) {
            console.error('Error:', error.message);
        }
    }*/
    

    return (
        <div className="app-footer">

            {/* <YouTubeAudioPlayer videoId={'K9mzg8ueiYA'}></YouTubeAudioPlayer> */}
        </div>
    )
}
