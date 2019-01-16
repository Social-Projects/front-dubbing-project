import React from 'react';
import SidebarItem from './SidebarItem';
import ActionSection from './ActionSection/ActionSection';
import perfomanceLogo from './img/perfomance-logo.png';
import eventLogo from './img/event-logo.png';
import streamLogo from './img/stream-logo.png';
import './Sidebar.css';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        let isPerfomancesLinkActive = true;
        let isStreamLinkActive = false;
        if (location.pathname === '/stream')
        {
            isPerfomancesLinkActive = false;
            isStreamLinkActive = true;
        }

        this.state = {
            links: [
                { isActive: isPerfomancesLinkActive },
                { isActive: false },
                { isActive: isStreamLinkActive }
            ] 
        };
    }

    changeLinkActive = (index: number): void => {
        let nextActiveLink = {
            ...this.state.links[index]
        };
        const copyLinks = [
            ...this.state.links
        ];

        copyLinks.forEach(link => link.isActive = false);
        nextActiveLink.isActive = true;
        copyLinks[index] = nextActiveLink;

        this.setState({
            links: copyLinks
        });
    }

    render() {

        let actionSection: any = null;
        if (window.location.pathname === '/stream') {
            actionSection = <ActionSection />;
        }

        return (
            <div className="sidebar">
                <nav className="nav">
                    <Link to="/">
                        <SidebarItem
                            name="Вистави"
                            imgSrc={perfomanceLogo}
                            isActive={this.state.links[0].isActive}
                            clicked={() => this.changeLinkActive(0)} />
                    </Link>
                    <Link to="/">
                        <SidebarItem
                            name="Події"
                            imgSrc={eventLogo}
                            isActive={this.state.links[1].isActive}
                            clicked={() => this.changeLinkActive(1)} />
                    </Link>
                    <Link to="/stream">
                        <SidebarItem
                            name="Трансляції"
                            imgSrc={streamLogo}
                            isActive={this.state.links[2].isActive}
                            clicked={() => this.changeLinkActive(2)} />
                    </Link>
                </nav>
                
                {actionSection}
            </div>
        )
    }
}

export default Sidebar;