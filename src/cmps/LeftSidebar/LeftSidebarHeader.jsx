import { Link } from "react-router-dom";


export function SideBarHeader() {

    return (
        <div className="side-bar-header">
            <ul className="clean-list">
                <li key="home"> <Link to={"/"}><img src="src\assets\img\homefull.svg"></img><span>Home</span></Link></li>
                <li key="search"><Link to={"/search"}><img src="src\assets\img\search.svg"></img><span>Search</span></Link></li>
            </ul>
        </div>
    )
}
