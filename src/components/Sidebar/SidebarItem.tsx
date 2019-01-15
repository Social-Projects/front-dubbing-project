import React from 'react';
import './SidebarItem.css';

interface SidebarItemProps {
    href: string;
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
            <a href={this.props.href}
               className={"nav-item" + (this.props.isActive === true ? " nav-item-active" : "")}
               onClick={this.props.clicked}>
                <img src={this.props.imgSrc} alt=""/>
                <span>{this.props.name}</span>
            </a>
        )
    }
}

export default SidebarItem;