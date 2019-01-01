import React from 'react';

class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isImg: this.props.imgSrc === undefined ? false : true
        }
    }

    render() {
        const style = {
            width: this.props.width,
            height: this.props.height,
            backgroundColor: this.props.backgroundColor,
            borderRadius: this.props.borderRadius,
            fontSize: this.props.fontSize,
            transition: 'all ' + this.props.transitionDuration
            // imgPos: this.props.imgPos == undefined ? "left" : this.props.imgPos
        };

        return (
            <button style={style} className={this.props.className}>
                {this.props.children}
                <span>{this.props.text}</span>
            </button>
        )
    }
}

export default Button;