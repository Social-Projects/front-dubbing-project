import React from 'react';
import SidebarItem from './SidebarItem';
import ActionSection from './ActionSection/ActionSection';
import perfomanceLogo from './img/perfomance-logo.png';
import eventLogo from './img/event-logo.png';
import streamLogo from './img/stream-logo.png';
import './Sidebar.css';
import { Link } from 'react-router-dom';

interface SidebarState {
    links: {
        isActive: boolean
    }[],
    performanceId: number
}

class Sidebar extends React.Component<{}, SidebarState> {
    constructor(props: any) {
        super(props);
        this.state = {
            links: [
                { isActive: true },
                { isActive: false },
                { isActive: false }
            ],
            performanceId: -1
        };
    }

    componentDidMount() {
        //setInterval(() => this.checkIsStreamPageActive(), 1000);
        console.log("Sidebar componentDidMound");
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

    // checkIsStreamPageActive = () => {
    //     // if (localStorage.getItem("isStreamActive") != null) {
    //     //     let performanceInString: any = "";
    //     //     performanceInString = localStorage.getItem("isStreamActive");
    //     //     let perfomance = JSON.parse(performanceInString);
            
    //     //     this.changeLinkActive(2);
    //     //     localStorage.removeItem("isStreamActive");
    //     // }
    //     // else {
    //     //     return;
    //     // }
    // }

    static getDerivedStateFromProps(props: any, state: any) {
        const pathName = location.pathname;
        const segments = pathName.split('/');
        const newState = {
            ...state
        };

        if (segments[1] === 'stream') {
            newState.links.forEach((link: any) => link.isActive = false);
            newState.links[2].isActive = true;
            newState.performanceId = parseInt(segments[2]);
        }
        else {
            newState.performanceId = -1;
        }

        return newState;
    }

    render() {

        let actionSection = null;
        if (this.state.performanceId !== -1) {
            actionSection = <ActionSection performanceId={this.state.performanceId} />;
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
                    <a href="" onClick={(event) => event.preventDefault()}>
                        <SidebarItem
                            name="Трансляції"
                            imgSrc={streamLogo}
                            isActive={this.state.links[2].isActive}
                            clicked={() => {}} />
                    </a>
                </nav>
                
                {actionSection}
            </div>
        )
    }
}

export default Sidebar;