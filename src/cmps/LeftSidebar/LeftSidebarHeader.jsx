import { Link } from "react-router-dom";


export function SideBarHeader() {

    return (
        <div className="left-sidebar-header">
            <ul className="clean-list">
                <li key="home"> <Link to={"/"}><img src="src\assets\img\homefull.svg align-center"></img><span>Home</span></Link></li>
                <li key="search"><Link to={"/search"}><img src="src\assets\img\search.svg align-center"></img><span>Search</span></Link></li>
                    </ul>
        </div>
    )
}
