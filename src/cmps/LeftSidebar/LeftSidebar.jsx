
import { React } from 'react'

import { SideBarHeader } from "./LeftSidebarHeader.jsx"
import { SideBarContent } from "./LeftSidebarContent.jsx"


export function LeftSidebar() {

// console.log('Render LeftSidebar')
    return (
        <div className='left-sidebar'>
            <SideBarHeader />
            <SideBarContent />
        </div>
    )
}