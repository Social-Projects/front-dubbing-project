import React from "react";

import ActionSection from "./ActionSection/ActionSection";
import SidebarItem from "./SidebarItem/SidebarItem";

import eventLogo from "../../../assets/images/event-logo.png";
import perfomanceLogo from "../../../assets/images/perfomance-logo.png";
import streamLogo from "../../../assets/images/stream-logo.png";

import "./Sidebar.css";

interface ISidebarState {
    performanceId: number;
    isVisible: boolean;
}

class Sidebar extends React.Component<{}, ISidebarState> {

    public static getDerivedStateFromProps(props: {}, state: ISidebarState) {
        const updatedState = {
            ...state,
        };
        const segments = location.pathname.split("/");

        if (segments[1] === "login") {
            updatedState.isVisible = false;
        } else if (segments[1] === "stream") {
            updatedState.performanceId = parseInt(segments[2], undefined);
        }

        if (segments[1] !== "stream" && updatedState.performanceId !== -1) {
            updatedState.performanceId = -1;
        }

        return updatedState;
    }
    constructor(props: any) {
        super(props);
        this.state = {
            isVisible: true,
            performanceId: -1,
        };
    }

    public render() {
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
                            clicked={null} />
                        <SidebarItem
                            name="Події"
                            imgSrc={eventLogo}
                            path="/event"
                            clicked={null}/>
                        <SidebarItem
                            name="Трансляції"
                            imgSrc={streamLogo}
                            path="/stream"
                            clicked={(event: Event) => { event.preventDefault(); }} />
                    </nav>
                    {actionSection}
                </div> : null
        );
    }
}

export default Sidebar;
