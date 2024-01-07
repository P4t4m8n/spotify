

export function SideBarHeader() {

    return (
        <div className="left-sidebar-header">
            <ul className="clean-list">
                <li key="home"><a href="/" className="flex align-center"><p>🏠</p><span>Home</span></a></li>
                <li key="search"><a href="/search" className="flex align-center"><p>🔍</p><span>Search</span></a></li>
            </ul>
        </div>
    )
}
