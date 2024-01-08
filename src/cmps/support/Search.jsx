import { useState, useEffect } from "react"


export function Search() {


  const [filterBy, setFilterBy] = useState({ txt: '' })
  const [videos, setVideos] = useState([])



  useEffect(() => {
    setFilterBy(filterBy)
  }, [filterBy])

  function onFilter(ev) {
    ev.preventDefault()
    setFilterBy(filterBy)
  }

  function playSong(id) { }



  function getVideos(term) {
    const termVideosMap = storageService.load(KEY) || {}
    if (termVideosMap[term]) return Promise.resolve(termVideosMap[term])

    console.log('Getting from Network...')
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${API}&q=${term}`
    const API = 'AIzaSyCp8KMTEjR9frWUGpSnc8Cw5cLVe7wRRDM'


    return axios.get(url)
      .then(res => { console.log(res); return res })
      .then(res => res.data.items)
      .then(ytVideos => ytVideos.map(ytVideo => ({
        id: ytVideo.id.videoId,
        title: ytVideo.snippet.title,
        img: {
          url: ytVideo.snippet.thumbnails.default.url,
          width: ytVideo.snippet.thumbnails.default.width,
          height: ytVideo.snippet.thumbnails.default.height,
        }
      })))
      .then(videos => {
        return videos
      })
  }




  function handleChange({ target }) {
    let value = target.value
    const field = target.name
    //const type = target.type
    console.log(value, field)

    setFilterBy((prevFilterBy) => ({ ...prevFilterBy, [field]: value }))
  }

  const { txt } = filterBy

  return (
    <section className="search-box">
      <form onSubmit={onFilter}>
        <img src="src\assets\img\search.svg"></img>
        <input

          value={txt}
          onChange={handleChange}
          type="text"
          id="txt"
          name="txt"
          placeholder="What do you want to listen to?" />

      </form>
    </section>
  )

}