import { useState } from "react"
import { useNavigate, useParams } from "react-router"
import { utilService } from "../../services/util.service"


export function Search() {

  const [searchTerm, setSearchTerm] = useState('')

  const params = useParams()
  const navigate = useNavigate()


  // const navigateToSearch = (value) => {
  //   navigate('/search/' + value)
  // }

  // const debouncedNavigate = utilService.debounce(navigateToSearch)

  function handleSearchChange (ev) {
    ev.preventDefault()
    const value = ev.target.value
    setSearchTerm(value)
    // navigate('/search/' + value)
    // debouncedNavigate(ev.target.value)
  }

  function onSubmit(ev) {
    ev.preventDefault()
    navigate('/search/' + searchTerm)
    // debouncedNavigate(searchTerm)
  }

console.log('Render search')
  return (
    <section className="search-box">
      <form onSubmit={onSubmit}  >
        <img src="src\assets\img\search.svg"></img>
        <input
          value={searchTerm}
          onChange={handleSearchChange}
          type="search"
          id="searchTerm"
          name="searchTerm"
          placeholder="What do you want to listen to?" />
          <button>xx</button>
      </form>
    </section>
  )

}