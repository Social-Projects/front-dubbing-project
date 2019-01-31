import React from 'react';
import { NavLink } from 'react-router-dom';

import classes from './SidebarItem.module.css';

interface SidebarItemProps {
    imgSrc: string;
    name: string;
    clicked: any,
    path: string
}

class SidebarItem extends React.Component<SidebarItemProps> {
    constructor(props: SidebarItemProps) {
        super(props);
    }

    render() {
        return (
            <NavLink
                to={this.props.path}
                className={classes.NavItem}
                activeClassName={classes.NavItemActive}
                onClick={this.props.clicked}>
                    <img src={this.props.imgSrc} alt=""/>
                    <span>{this.props.name}</span>
            </NavLink>
        )
    }
}

export default SidebarItem;