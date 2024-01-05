

export function SideBarHeader() {

    return (
        <div className="side-bar-header">
            <ul className="clean-list">
                <li key="home"><a href="/" className="flex"><p>🏠</p><span>Home</span></a></li>
                <li key="search"><a href="/search" className="flex"><p>🔍</p><span>Search</span></a></li>
            </ul>
        </div>
    )
}
