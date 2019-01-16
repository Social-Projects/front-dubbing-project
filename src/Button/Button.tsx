import React from 'react';

interface ButtonProps {
    width: string;
    height: string;
    backgroundColor: string;
    borderRadius: string;
    fontSize: string;
    transitionDuration: string;
    className: string;
    text: string;
}

class Button extends React.Component<ButtonProps> {
    
    render() {
        const style = {
            width: this.props.width,
            height: this.props.height,
            backgroundColor: this.props.backgroundColor,
            borderRadius: this.props.borderRadius,
            fontSize: this.props.fontSize,
            transition: 'all ' + this.props.transitionDuration
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