import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { SET_FILTER } from "../../store/redcuers/app.reducer"
import { Link, useNavigate } from "react-router-dom"
import { saveStation, setUserStations } from "../../store/actions/station.actions"
import { stationService } from "../../services/station.service"
import { updateUser } from "../../store/actions/user.actions"
import { Arrow, ArrowBack, Create, Dots, Libary, Note, Pin, Plus, SearchSvg, Sort } from "../../services/icons.service"
import { Search } from "@mui/icons-material"
import { Input } from "@mui/joy"
import { SortByModal } from "./SortModal"

import React from 'react';




export function SideBarContent() {

    const user = useSelector((storeState) => storeState.userMoudle.userObj)

    const userStations = useSelector((storeState) => storeState.stationsMoudle.userStations)
    const [filterSort, setFilterSort] = useState({ name: '', sortBy: '' })
    const [showSearch, setShowSearch] = useState(false)
    const [resize, setResize] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)

    const navigate = useNavigate()


    useEffect(() => {
        // if (user && user.stations && user.stations.length) {
        //     console.log("user:", user)
        //     getUserStations(user.stations)


        // }
    }, [user])

    function FilterList() {
        const regex = new RegExp(filterSort.name, 'i')
        let newList = userStations.filter(station => regex.test(station.name))
        if (filterSort.sortBy === 'name') newList.sort((stationA, stationB) => stationA.name.localeCompare(stationB.name))
        else if (filterSort.sortBy === 'createAt') newList.sort((stationA, stationB) => stationA.createdAt - stationB.createdAt)
        setUserStations(newList)

    }

    async function getUserStations(stations) {
        setUserStations(stations)
    }

    function openModal() { setIsModalOpen(true) }
    function closeModal() { setIsModalOpen(false) }


    async function createStation() {

        let newStation = stationService.getEmptyStation('My station #', userStations.length - 1)

        try {
            newStation = await saveStation(newStation)
            const newUserStations = user.stations
            newUserStations.push(newStation)
            const editUser = { ...user, stations: newUserStations }
            await updateUser(editUser)
            navigate('/1/station/edit/' + newStation._id)
        }
        catch (err) { console.log(err) }

    }

    function handleChange({ target }) {
        setFilterSort(prev => ({ ...prev, name: target.value }))
        FilterList()
        if (!target.value) setUserStations([...user.stations])
    }

    if (!userStations || !user) return <div>...Loading</div>

    return (

        <div className="side-bar-content" >

            <section className="creation-and-toggle flex">

                <p className="your-library flex" >
                    <Libary></Libary>
                    <span>Your Library</span>
                </p>

                <div className="right-buttons flex animate__animated animate__rubberBand">

                    <button onClick={createStation} className="animate__animated animate__rubberBand">
                        <Plus></Plus>
                    </button>

                    <p className="inline-block">
                        <span >
                            <Arrow></Arrow>

                        </span>
                    </p>

                </div>

            </section>

            <section className="side-bar-filtersort">
                <div className="search-sort-view">

                    <div className="search-sort-toggle-buttons flex">
                        <button onClick={() => setShowSearch(!showSearch)} >
                            <SearchSvg></SearchSvg>
                        </button>
                        {showSearch &&
                            <Input
                                color="neutral"
                                type="search"
                                placeholder="Search your libary"
                                size="sm"
                                variant="soft"
                                onChange={handleChange}
                                sx={{ backgroundColor: "gray", opacity: "70%", width: '11.75rem', height: "2rem", padding: ".5rem" }}
                            />
                        }
                        <button className="sort" onClick={openModal}>
                            <Sort></Sort>
                            {filterSort.sortBy}
                            {isModalOpen && <SortByModal setFilterSort={setFilterSort} isOpen={isModalOpen} onClose={closeModal} filterSort={filterSort}> </SortByModal>}
                        </button>
                    </div>

                </div>
            </section >

            <section className="side-bar-content">

                    <ul>
                        {
                            user.stations.map((station,idx) => (
                                    <Link key={station._id} to={'/1/station/edit/' + station._id}>
                                        <li className="grid">
                                            {station.imgUrl ?
                                                <img className="station-image-left-sidebar" src={station.imgUrl}></img> :
                                                <div className="svg-box">
                                                    <Note></Note>
                                                </div>
                                            }
                                            <header>{station.name}</header>
                                            <p>
                                                <Pin></Pin>
                                                <span className="station-type">{station.type}</span>
                                                <span>{station.songs.length} songs</span>
                                            </p>

                                        </li>
                                    </Link>
                            ))}
                    </ul>
            </section>
        </div >
    )
}


