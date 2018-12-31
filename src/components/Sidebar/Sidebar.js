import React from 'react';
import SidebarItem from '../SidebarItem/SidebarItem';
import './Sidebar.css';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="sidebar">
                <nav className="nav">
                    <SidebarItem
                        href="index.html"
                        name="Вистави"
                        imgSrc="./img/perfomance-logo.png"
                        isActive="true" />
                    <SidebarItem
                        href=""
                        name="Трансляції"
                        imgSrc="./img/stream-logo.png"
                        isActive="false"/>
                </nav>
            </div>
        )
    }
}

export default Sidebar;