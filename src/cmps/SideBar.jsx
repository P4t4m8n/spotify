


import { React } from 'react'
import { useSelector } from 'react-redux'

import { SideBarHeader } from "./SideBarHeader.jsx"
import { SideBarContent } from "./SideBarContent.jsx"


export function SideBar() {

    const sidebarWidth = useSelector((state) => state.sidebarModule.width);


    return (
        <div className="sidebar" style={{ width: `${sidebarWidth}px` }}>
            <SideBarHeader />
            <SideBarContent />
        </div>
    )
}