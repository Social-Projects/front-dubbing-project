import React from 'react';
import './SidebarItem.css';

class SidebarItem extends React.Component {
    constructor(props) {
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