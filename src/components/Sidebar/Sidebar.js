import React from 'react';
import SidebarItem from '../SidebarItem/SidebarItem';
import perfomanceLogo from './img/perfomance-logo.png';
import streamLogo from './img/stream-logo.png';
import './Sidebar.css';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            perfomancesActive: [
                { isActive: true },
                { isActive: false }
            ] 
        };
    }

    render() {
        return (
            <div className="sidebar">
                <nav className="nav">
                    <SidebarItem
                        href="index.html"
                        name="Вистави"
                        imgSrc={perfomanceLogo}
                        isActive={this.state.perfomancesActive[0].isActive} />
                    <SidebarItem
                        href=""
                        name="Трансляції"
                        imgSrc={streamLogo}
                        isActive={this.state.perfomancesActive[1].isActive}/>
                </nav>
            </div>
        )
    }
}

export default Sidebar;