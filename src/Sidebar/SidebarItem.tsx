import React from 'react';
import './SidebarItem.css';

interface SidebarItemProps {
    href: string;
    imgSrc: string;
    isActive: boolean;
    name: string;
}

interface SidebarItemState {
    isActive: boolean;
}

class SidebarItem extends React.Component<SidebarItemProps, SidebarItemState> {
    constructor(props: SidebarItemProps) {
        super(props);
        this.state = {
            isActive: props.isActive
        }
    }

    render() {
        return (
            <a href={this.props.href}
               className={"nav-item" + (this.state.isActive === true ? " nav-item-active" : "")}>
                <img src={this.props.imgSrc} alt=""/>
                <span>{this.props.name}</span>
            </a>
        )
    }
}

export default SidebarItem;