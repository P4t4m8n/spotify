import { SideBarHeader } from "./SideBarHeader.jsx"
import { SideBarContent } from "./SideBarContent.jsx"


export function SideBar() {

    return (
        <div className="side-bar">
            <SideBarHeader />
            <SideBarContent />
        </div>
    )
}