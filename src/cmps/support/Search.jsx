import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import { utilService } from "../../services/util.service"


export function Search() {

  const [searchTerm, setSearchTerm] = useState('')

  const params = useParams()
  const navigate = useNavigate()


  const navigateToSearch = (value) => {
    navigate('/search/' + value)
  }

  const debouncedNavigate = utilService.debounce(navigateToSearch)

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value)
    debouncedNavigate(event.target.value)
  }


  return (
    <section className="search-box">
      <form >
        <p style={{marginRight:"10px"}}></p>
        <img src="src\assets\img\search.svg"></img>
        <input
          value={searchTerm}
          onChange={handleSearchChange}
          type="text"
          id="searchTerm"
          name="searchTerm"
          placeholder="What do you want to listen to?" />
      </form>
    </section>
  )

}