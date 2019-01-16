import React from 'react';
import Button from '../Button/Button';
import './Logout.css';

class Logout extends React.Component {
    render() {
        return (
            <div className="logout">
                {/* <span class="user-name"> Ввійшов як {this.props.user.name} {this.props.user.surname}</span> */}
                <span className="user-name">Ввійшов як Март Отто</span>
                <Button
                    text="Вихід"
                    width="95px"
                    height="45px"
                    borderRadius="25px"
                    fontSize="18px"
                    transitionDuration="0.3s"
                    backgroundColor="#da4453"
                    className="user-action"></Button>
            </div>
        );
    }
}

export default Logout;