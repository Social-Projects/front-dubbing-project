import React from 'react';
import SidebarItem from './SidebarItem';
import perfomanceLogo from './img/perfomance-logo.png';
import eventLogo from './img/event-logo.png';
import streamLogo from './img/stream-logo.png';
import './Sidebar.css';

interface SidebarState {
    perfomancesActive: [
        { isActive: boolean },
        { isActive: boolean },
        { isActive: boolean }
    ]
}

class Sidebar extends React.Component<{}, SidebarState> {
    constructor(props: any) {
        super(props);

        this.state = {
            perfomancesActive: [
                { isActive: true },
                { isActive: false },
                { isActive: false }
            ] 
        };
    }

    render() {
        return (
            <div className="sidebar">
                <nav className="nav">
                    <SidebarItem
                        href=""
                        name="Вистави"
                        imgSrc={perfomanceLogo}
                        isActive={this.state.perfomancesActive[0].isActive} />
                    <SidebarItem
                        href=""
                        name="Події"
                        imgSrc={eventLogo}
                        isActive={this.state.perfomancesActive[1].isActive} />
                    <SidebarItem
                        href=""
                        name="Трансляції"
                        imgSrc={streamLogo}
                        isActive={this.state.perfomancesActive[2].isActive}/>
                </nav>
            </div>
        )
    }
}

export default Sidebar;