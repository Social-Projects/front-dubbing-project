import React from 'react';
import './SidebarItem.css';

interface SidebarItemProps {
    imgSrc: string;
    isActive: boolean;
    name: string;
    clicked: any
}

class SidebarItem extends React.Component<SidebarItemProps> {
    constructor(props: SidebarItemProps) {
        super(props);
    }

    render() {
        return (
            <span className={"nav-item" + (this.props.isActive === true ? " nav-item-active" : "")}
               onClick={this.props.clicked}>
                <img src={this.props.imgSrc} alt=""/>
                <span>{this.props.name}</span>
            </span>
        )
    }
}

export default SidebarItem;