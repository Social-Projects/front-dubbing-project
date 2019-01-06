import React from 'react';
import Button from '../Button/Button';
import './PerfomanceItem.css';

import gotoLogo from './img/goto-logo.png'
import closeLogo from './img/close-logo.png';
import closeLogoHover from './img/close-logo-hover.png';
import editLogo from './img/edit-logo.png';
import editLogoHover from './img/edit-logo-hover.png';

interface PerfomanceItemProps {
    title: string;
    text: string;
}

interface Logo {
    img: string;
    name: string;
    hovered: boolean;
}

interface PerfomanceItemState {
    closeLogo: Logo,
    editLogo: Logo
}

class PerfomanceItem extends React.Component<PerfomanceItemProps, PerfomanceItemState> {
    constructor(props: PerfomanceItemProps) {
        super(props);
        this.state = {
            closeLogo: {
                img: closeLogo,
                name: 'closeLogo',
                hovered: false
            },
            editLogo: {
                img: editLogo,
                name: 'editLogo',
                hovered: false
            }
        }
    }

    hoverHandler(el: Logo) {
        let obj = {};
        if (el.name === 'closeLogo') {
            obj = {
                closeLogo: {
                    img: el.hovered === false ? closeLogoHover : closeLogo,
                    name: 'closeLogo',
                    hovered: !el.hovered
                }
            }
        }
        else if (el.name === 'editLogo') {
            obj = {
                editLogo: {
                    img: el.hovered === false ? editLogoHover : editLogo,
                    name: 'editLogo',
                    hovered: !el.hovered
                }
            }
        }

        this.setState(obj);
    }

    render() {
        return (
            <div className="perfomanceItem">
                <span className="perfomanceItem-head">{this.props.title}</span>
                <p className="perfomanceItem-body">{this.props.text}</p>
                <Button
                    text="Перейти до вистави"
                    className="perfomanceItem-footer"
                    width="233px"
                    height="45px"
                    borderRadius="30px"
                    fontSize="18px"
                    backgroundColor="#8cc152"
                    transitionDuration="0.3s">
                    <img src={gotoLogo} alt=""/>
                </Button>
                <a href="" className="editLogo"
                            onMouseEnter={this.hoverHandler.bind(this, this.state.editLogo)}
                            onMouseLeave={this.hoverHandler.bind(this, this.state.editLogo)}>
                    <img src={this.state.editLogo.img} alt=""/>
                </a>
                <a href="" className="closeLogo"
                            onMouseEnter={this.hoverHandler.bind(this, this.state.closeLogo)}
                            onMouseLeave={this.hoverHandler.bind(this, this.state.closeLogo)}>
                    <img src={this.state.closeLogo.img} alt=""/>
                </a>
            </div>
        )
    }
}

export default PerfomanceItem;