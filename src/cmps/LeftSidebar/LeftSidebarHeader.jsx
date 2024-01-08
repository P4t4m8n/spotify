import { Link } from "react-router-dom";

export function SideBarHeader() {

    return (
        <div className="left-sidebar-header">

            <ul className="clean-list">

                <li key="home">
                    <Link to={"/"} className="flex align-center">
                        <img src="src\assets\img\homefull.svg" className="left-sidebar-home-icon"></img>
                        <span>Home</span>
                    </Link>
                </li>

                <li key="search">
                    <Link to={"/search"} className="flex align-center">
                        <img src="src\assets\img\search.svg" className="left-sidebar-search-icon"></img>
                        <span>Search</span>
                    </Link>
                </li>

            </ul>

        </div>
    )
}
