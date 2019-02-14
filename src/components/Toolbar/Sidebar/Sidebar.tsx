import React from 'react';

import SidebarItem from './SidebarItem/SidebarItem';
import ActionSection from './ActionSection/ActionSection';
import './Sidebar.css';

import perfomanceLogo from '../../../assets/images/perfomance-logo.png';
import eventLogo from '../../../assets/images/event-logo.png';
import streamLogo from '../../../assets/images/stream-logo.png';

interface SidebarState {
    performanceId: number,
    isVisible: boolean
}

class Sidebar extends React.Component<{}, SidebarState> {
    constructor(props: any) {
        super(props);
        this.state = {
            performanceId: -1,
            isVisible: true
        };
    }

    static getDerivedStateFromProps(props: {}, state: SidebarState) {
        const updatedState = {
            ...state
        };
        const segments = location.pathname.split('/');

        if (segments[1] === 'login') {
            updatedState.isVisible = false;
        } else if(segments[1]==='manage'){
            updatedState.isVisible = false;
        }else if(segments[1]==='register'){
            updatedState.isVisible = false;
        }
        else if (segments[1] === 'stream') {
            updatedState.performanceId = parseInt(segments[2]);
        }

        if (segments[1] !== 'stream' && updatedState.performanceId !== -1) {
            updatedState.performanceId = -1;
        }

        return updatedState;
    }

    render() {
        let actionSection = null;
        if (this.state.performanceId !== -1) {
            actionSection = <ActionSection performanceId={this.state.performanceId} />;
        }

        return (
            this.state.isVisible ? 
                <div className="sidebar">
                    <nav className="nav">
                        <SidebarItem
                            name="Вистави"
                            imgSrc={perfomanceLogo}
                            path="/performance"
                            clicked={() => {}} />
                        <SidebarItem
                            name="Події"
                            imgSrc={eventLogo}
                            path="/event" 
                            clicked={() => {}}/>
                        <SidebarItem
                            name="Трансляції"
                            imgSrc={streamLogo}
                            path="/stream"
                            clicked={(event: Event) => { event.preventDefault(); }} />
                    </nav>
                    {actionSection}
                </div> : null
        )
    }
}


export default Sidebar;